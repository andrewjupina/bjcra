import React from 'react';

const Card = ({ rank, suit, hidden }) => {
  const cardImage = hidden ? '/cards/back.png' : `/cards/${rank}-${suit}.png`;
  const altText = hidden ? 'Hidden card' : `${rank} of ${suit}`;

  return (
    <img src={cardImage} alt={altText} style={{ height: '200px', width: '150px', margin: '10px' }}/>
  );
};


export default Card;
