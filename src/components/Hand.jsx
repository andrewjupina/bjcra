import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Card from './Card';

const Hand = ({ cards }) => {
  return (
    <Box>
      <Flex direction="row" align="center">
        {cards.map((card, index) => (
          <Box key={index} marginLeft={index !== 0 ? '-140px' : null}>
            <Card rank={card.rank} suit={card.suit}/>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};


export default Hand;