// Calculate the value of a hand
export function calculateHandValue(hand) {
  let value = 0;
  let aces = 0; // Keep track of aces

  // Loop over all cards in the hand
  for (let card of hand) {
    if (card.rank === 'A') {
      aces += 1;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }

  // While value is over 21 and there are aces in the hand,
  // treat them as 1 instead of 11
  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
}

export function isBlackjack(hand) {
  return hand.length === 2 && calculateHandValue(hand) === 21;
}

export function isBust(hand) {
  return calculateHandValue(hand) > 21;
}

export function isSoftHand(hand) {
  let valueWithoutAce = hand
    .filter(card => card.rank !== 'A')
    .reduce((value, card) => value + getCardValue(card), 0);

  // Check if there is an Ace and if it can be counted as 11 without the hand going bust
  return hand.some(card => card.rank === 'A') && valueWithoutAce <= 10;
}

function getCardValue(card) {
  if (card.rank === 'A') {
    return 11; // Max value of Ace
  } else if (['K', 'Q', 'J'].includes(card.rank)) {
    return 10;
  } else {
    return parseInt(card.rank);
  }
}

export function handleSplit(startingHand) {
  let firstHand = [startingHand[0]];
  let secondHand = [startingHand[1]];
  return [firstHand, secondHand];
}
