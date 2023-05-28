import React from 'react';
import { Box } from '@chakra-ui/react';

function Deck({ deck }) {
  return (
    <Box>
      <p>Cards left in deck: {deck.length}</p>
    </Box>
  );
}

export default Deck;
