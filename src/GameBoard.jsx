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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setIsGameOver] = useState(false);
  const [isFirstHand, setIsFirstHand] = useState(true);


  useEffect(() => {
    const newScore = calculateHandValue(playerHand);
    setPlayerScore(newScore);
  }, [playerHand, calculateHandValue]);

  useEffect(() => {
    const newScore = calculateHandValue(dealerHand);
    setDealerScore(newScore);
  }, [dealerHand, calculateHandValue]);

  useEffect(() => {
    if (!isPlayersTurn && isGameStarted && !gameOver) {
      handleDealerTurn();
    }
  }, [isPlayersTurn]);

  useEffect(() => {
    let timeoutId;

    if (gameOver || winner !== null) {
      timeoutId = setTimeout(() => {
        gameReset();
      }, 3000);
    }

    return () => clearTimeout(timeoutId); // This is used to clear the timeout when the component unmounts, or when gameOver changes again before the 3 seconds are up.

  }, [gameOver, winner]);

  const gameReset = () => {
    setPlayerHand([]);
    setPlayerScore(0);
    setDealerHand([]);
    setDealerScore(0);
    setIsPlayersTurn(false);
    setWinner(null);
    setIsDealerCardHidden(true);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  // This function starts a new game
  const handleGameStart = () => {
    let newDeck = isFirstHand ? shuffleDeck(createDeck()) : deck;
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

    checkForDealtBlackjack(playerHand, dealerHand);
    setIsPlayersTurn(true);
    setIsGameStarted(true);
    setIsFirstHand(false);
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
      setIsGameOver(true);
    }
  };

  // This will declare that the player is done with their turn and then the dealers turn will take effect
  const handlePlayerStand = () => {
    setIsPlayersTurn(false);
    setIsDealerCardHidden(false);
  };

  const handlePlayerDouble = () => {
    handlePlayerHit();
    handlePlayerStand();
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

  const checkForDealtBlackjack = (playerHand, dealerHand) => {
    if (isBlackjack(playerHand) && !isBlackjack(dealerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Player');
      setIsGameOver(true);
      return;
    }
    if (isBlackjack(dealerHand) && !isBlackjack(playerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Dealer');
      setIsGameOver(true);
      return;
    }
    if (isBlackjack(playerHand) && isBlackjack(dealerHand)) {
      setIsDealerCardHidden(false);
      setWinner('Push');
      setIsGameOver(true);
      return;
    }
  };

  return (
    <Box>
      {winner !== null && (
        <p>{winner} wins!</p>
      )}
      {!isDealerCardHidden && (
        <>
          <Text>Dealer Score: {dealerScore}</Text>
        </>
      )}
      <Dealer hand={dealerHand} isDealerCardHidden={isDealerCardHidden}/>
      <Player hand={playerHand} />
      {isGameStarted && (
        <Text>Player Score: {playerScore}</Text>
      )}
      <Deck deck={deck} />
      {isPlayersTurn && (
      <>
        <Button onClick={handlePlayerDouble}>Double</Button>
        <Button onClick={handlePlayerHit}>Hit</Button>
        <Button onClick={handlePlayerStand}>Stand</Button>
      </>
    )}
      {!isGameStarted && !gameOver && (
        <Button onClick={handleGameStart}>Deal Cards</Button>
      )}
    </Box>
  );
};

export default GameBoard;
