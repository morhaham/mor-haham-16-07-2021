import {
  Flex,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import useError from '../../hooks/useError';
import { useGetConditionsByCityKeyQuery } from '../../state/services/conditions';

const icons = require.context('../../img/icons', true, /\.svg$/);

const CurrentConditions = ({ city }) => {
  const {
    data: conditionsArr,
    error,
    isLoading,
  } = useGetConditionsByCityKeyQuery(city?.cityKey);
  useError({
    msgTitle: 'Could not fetch current conditions.',
    msgDesc: 'Maybe exceeded 50 calls.',
    error,
  });
  const iconFilter = useColorModeValue(
    'none',
    'invert(100%) sepia(0%) saturate(7443%) hue-rotate(198deg) brightness(126%) contrast(112%)'
  );

  let conditions = conditionsArr && conditionsArr[0];

  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex align='center' alignItems='stretch'>
        <Flex border='1px' borderColor='lightGray' mr={3} borderRadius='lg'>
          <Image
            filter={iconFilter}
            src={conditions && icons(`./${conditions.WeatherIcon}.svg`).default}
            fallbackSrc='https://via.placeholder.com/60'
          />
        </Flex>
        <Flex>
          <Flex direction='column' justify='space-around'>
            <Text fontWeight='bold'>{city?.cityName || 'Tel Aviv'}</Text>
            <Text>{conditions?.Temperature.Metric.Value}&#8451;</Text>

            <Text fontSize='lg'>
              {new Date(
                conditions?.LocalObservationDateTime
              ).toLocaleDateString()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default React.memo(CurrentConditions);
