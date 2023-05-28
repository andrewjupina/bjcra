import { calculateHandValue, isSoftHand } from './hand.js';
// Determine the winner
export function determineWinner(playerHand, dealerHand) {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) {
    return 'Dealer'; // Player busts, dealer wins
  } else if (dealerValue > 21) {
    return 'Player'; // Dealer busts, player wins
  } else if (playerValue > dealerValue) {
    return 'Player'; // Player has higher score, player wins
  } else if (dealerValue > playerValue) {
    return 'Dealer'; // Dealer has higher score, dealer wins
  } else {
    return 'Push'; // Scores are equal, it's a tie
  }
}

// Dealer strategy
export function shouldDealerHit(hand) {
  const value = calculateHandValue(hand);

  // Dealer hits on soft 17
  if (value === 17 && isSoftHand(hand)) {
    return true;
  }

  return value < 17;
}
