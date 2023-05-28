import React from 'react';
import { Box } from '@chakra-ui/react';
import Card from './Card';

const Dealer = ({ hand, isDealerCardHidden }) => {
  return (
    <Box>
      <Box display="flex" flexDirection="row" gap="2">
        {hand.map((card, index) => (
          <Card key={index} rank={card.rank} suit={card.suit} hidden={index === 0 && isDealerCardHidden} />
        ))}
      </Box>
    </Box>
  );
};


export default Dealer;
