import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CityBox from './CityBox';

const FavoriteCitiesModal = ({ modalControllers }) => {
  const { onClose, isOpen } = modalControllers;
  const { favoriteCities } = useSelector(({ weather }) => weather);

  return (
    <Modal
      size='3xl'
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize='2xl'>Favorite cities</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p='50px'>
          <Flex flexWrap='wrap' justify='space-around' wrap='flex-wrap'>
            {favoriteCities?.map((c) => (
              <CityBox key={c.cityKey} city={c} onClose={onClose} />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FavoriteCitiesModal;
