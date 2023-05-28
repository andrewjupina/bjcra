import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Card from './Card';

const Hand = ({ cards }) => {
  return (
    <Box>
      <Flex direction="row" align="center">
        {cards.map((card, index) => (
          <Card key={index} rank={card.rank} suit={card.suit}/>
        ))}
      </Flex>
    </Box>
  );
};


export default Hand;