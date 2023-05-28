import React from 'react';
import { Box } from '@chakra-ui/react';
import Hand from './Hand';

function Player({ hand, handTotal }) {
  return (
    <Box>
      <Hand cards={hand} total={handTotal} />
    </Box>
  );
}


export default Player;
