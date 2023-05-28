// Create a new deck of cards
export function createDeck() {
  const suits = ['H', 'D', 'C', 'S'];
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];

  let deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }

  return deck;
}

// Shuffle the deck
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
  }

  return deck;
}

// Deal a card from the deck
export function dealCard(deck) {
  const newDeck = [...deck];
  const card = newDeck.pop();
  return [card, newDeck];
}
