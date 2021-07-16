import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const BtnAddToFavorites = ({ toggleFavorite, isFavorite }) => {
  return (
    <>
      {isFavorite ? (
        <Button
          size='md'
          colorScheme='main'
          variant='outline'
          boxShadow='md'
          leftIcon={
            <Text color='red.500' fontSize='xl'>
              <FaHeartBroken />
            </Text>
          }
          onClick={toggleFavorite}
        >
          Remove From Favorites
        </Button>
      ) : (
        <Button
          size='md'
          colorScheme='main'
          variant='outline'
          boxShadow='md'
          leftIcon={
            <Text color='red.500' fontSize='xl'>
              <FaHeart />
            </Text>
          }
          onClick={toggleFavorite}
        >
          Add To Favorites
        </Button>
      )}
    </>
  );
};

export default BtnAddToFavorites;
