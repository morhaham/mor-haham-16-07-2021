import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <Flex
      h='75px'
      padding='0 50px'
      justifyContent='space-between'
      alignItems='center'
      borderBottom='1px'
      borderBottomColor='lightGray'
    >
      <NavLink to='/'>
        <Heading display={['none', 'block']} size='lg' color='main.500'>
          <Text as='span' color='herolo.500'>
            Herolo &nbsp;
          </Text>
          Weather Task
        </Heading>
        <Heading display={['block', 'none']} size='lg' color='main.500'>
          <Text as='span' color='herolo.500'>
            H &nbsp;
          </Text>
          Weather
        </Heading>
      </NavLink>
      <Nav />
    </Flex>
  );
};

export default Header;
