import {
  Button,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import FavoriteCitiesModal from '../favoriteCitiesModal';

const Nav = () => {
  const modalControllers = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <>
      <HStack spacing={8} ml='20px'>
        <NavLink to='/' as={NavLink}>
          <Button
            onClick={modalControllers.onOpen}
            boxShadow='md'
            colorScheme='main'
            variant='outline'
          >
            Favorites
          </Button>
        </NavLink>
        <IconButton
          colorScheme='main'
          variant='outline'
          boxShadow='md'
          onClick={handleClick}
          icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}
        />
      </HStack>
      <FavoriteCitiesModal modalControllers={modalControllers} />
    </>
  );
};

export default Nav;
