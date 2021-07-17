import { Flex, Heading, Spinner, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useError from '../../hooks/useError';
import { useGetCurrentPositionQuery } from '../../state/services/cities';
import {
  addFavoriteCity,
  removeFavoriteCity,
  setCurrentCity,
} from '../../state/weatherSlice';
import BtnAddToFavorites from './BtnAddToFavorites';
import CurrentConditions from './CurrentConditions';
import Forecasts from './Forecasts';

// if geolocation is disabled use this
const defaultCity = {
  cityName: 'Tel Aviv',
  cityKey: '215854',
  isFavorite: false,
};

const Weather = () => {
  const { currentCity } = useSelector(({ weather }) => weather);
  const [coords, setCoords] = useState(null);
  const {
    data: location,
    error,
    isLoading,
  } = useGetCurrentPositionQuery(coords, { skip: !coords });
  const dispatch = useDispatch();
  useError({
    msgTitle: 'Could not fetch the current position.',
    msgDesc: 'Maybe exceeded 50 calls.',
    error,
  });

  // get the current user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setCoords({ lat, lon });
      },
      // error getting the current location
      () => {
        dispatch(setCurrentCity(defaultCity));
      }
    );
  }, []);

  // set the current location
  useEffect(() => {
    if (location) {
      dispatch(
        setCurrentCity({
          cityName: location.LocalizedName,
          cityKey: location.Key,
          isFavorite: false,
        })
      );
    }
  }, [location]);

  const toggleFavorite = () => {
    if (!currentCity) return;
    if (currentCity.isFavorite) {
      dispatch(removeFavoriteCity(currentCity));
    } else {
      dispatch(addFavoriteCity(currentCity));
    }
  };

  if (isLoading) return <Spinner />;
  if (!currentCity)
    return (
      <Heading fontSize='md' color='herolo.500'>
        Sorry, nothing to show right now :(
      </Heading>
    );
  return (
    <Stack
      w='100%'
      spacing={24}
      border='1px'
      borderColor='lightGray'
      p='50px'
      boxShadow='xl'
      borderRadius='lg'
    >
      <Flex justify={['center', 'space-between']} flexWrap='wrap'>
        <CurrentConditions city={currentCity} />
        <Flex mt={['20px', '0']}>
          <BtnAddToFavorites
            toggleFavorite={toggleFavorite}
            isFavorite={currentCity?.isFavorite}
          />
        </Flex>
      </Flex>
      <Forecasts city={currentCity} />
    </Stack>
  );
};

export default Weather;
