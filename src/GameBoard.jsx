import React, { useState, useEffect } from 'react';
import { createDeck, shuffleDeck, dealCard } from './gameLogic/deck';
import { calculateHandValue, isBlackjack, isBust } from './gameLogic/hand';
import { shouldDealerHit, determineWinner } from './gameLogic/rules';
import Player from './components/Player';
import Dealer from './components/Dealer';
import Deck from './components/Deck';
import { Button, Box, Text } from '@chakra-ui/react';

const GameBoard = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [isPlayersTurn, setIsPlayersTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDealerCardHidden, setIsDealerCardHidden] = useState(true);


  useEffect(() => {
    const newScore = calculateHandValue(playerHand);
    setPlayerScore(newScore);
  }, [playerHand, calculateHandValue]);

  useEffect(() => {
    const newScore = calculateHandValue(dealerHand);
    setDealerScore(newScore);
  }, [dealerHand, calculateHandValue]);

  // This function starts a new game
  const handleGameStart = () => {
    setIsDealerCardHidden(true);
    setWinner(null);
    let newDeck = shuffleDeck(createDeck());
    let dealtCard;

    [dealtCard, newDeck] = dealCard(newDeck);
    const playerHand = [dealtCard];

    [dealtCard, newDeck] = dealCard(newDeck);
    playerHand.push(dealtCard);

    const dealerHand = [];
    [dealtCard, newDeck] = dealCard(newDeck);
    dealerHand.push(dealtCard);

    [dealtCard, newDeck] = dealCard(newDeck);
    dealerHand.push(dealtCard);

    setDeck(newDeck);
    setPlayerHand(playerHand);
    setDealerHand(dealerHand);

    if (isBlackjack(playerHand) && !isBlackjack(dealerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Player');
      return;
    }

    if (isBlackjack(dealerHand) && !isBlackjack(playerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Dealer');
      return;
    }

    if (isBlackjack(playerHand) && isBlackjack(dealerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Push');
      return;
    }
    setIsPlayersTurn(true);
  };

  // This deals a card to a player if they choose to hit
  const handlePlayerHit = () => {
    let newDeck = [...deck];
    let dealtCard;

    [dealtCard, newDeck] = dealCard(newDeck);
    const newHand = [...playerHand, dealtCard];
    setPlayerHand(newHand);
    setDeck(newDeck);

    if (isBust(newHand)) {
      setIsDealerCardHidden(false);
      setIsPlayersTurn(false);
      setWinner('Dealer');
    }
  };

  // This will declare that the player is done with their turn and then the dealers turn will take effect
  const handlePlayerStand = () => {
    setIsPlayersTurn(false);
    setIsDealerCardHidden(false);
    handleDealerTurn();
  };

  const handleDealerTurn = () => {
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    let dealtCard;

    while (shouldDealerHit(newDealerHand)) {
      [dealtCard, newDeck] = dealCard(newDeck);
      newDealerHand.push(dealtCard);
    }

    setDeck(newDeck);
    setDealerHand(newDealerHand);

    // After dealer's turn is over, check who won the game and set the game status
    const winner = determineWinner(playerHand, newDealerHand);
    setWinner(winner);
  };

  return (
    <Box>
      <p>{winner}</p>
      {!isDealerCardHidden && (
        <>
          <Text>Dealer Score: {dealerScore}</Text>
        </>
      )}
      <Dealer hand={dealerHand} isDealerCardHidden={isDealerCardHidden}/>
      <Player hand={playerHand} />
      <Text>Player Score: {playerScore}</Text>
      <Deck deck={deck} />
      {isPlayersTurn && (
      <>
        <Button onClick={handlePlayerHit}>Hit</Button>
        <Button onClick={handlePlayerStand}>Stand</Button>
      </>
    )}
      <Button onClick={handleGameStart}>Start Game</Button>
    </Box>
  );
};

export default GameBoard;
