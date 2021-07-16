import { Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { icons } from '../../App';
import useError from '../../hooks/useError';
import { useGetConditionsByCityKeyQuery } from '../../state/services/conditions';
import { setCurrentCity } from '../../state/weatherSlice';

const CityBox = ({ city, onClose }) => {
  const {
    data: conditionsArr,
    error,
    isLoading,
  } = useGetConditionsByCityKeyQuery(city?.cityKey);
  const dispatch = useDispatch();
  useError({
    msgTitle: 'Could not fetch current conditions.',
    msgDesc: 'Maybe exceeded 50 calls.',
    error,
  });

  const handleClick = () => {
    dispatch(setCurrentCity(city));
    onClose();
  };

  let conditions = conditionsArr && conditionsArr[0];
  if (isLoading) return <Spinner />;
  return (
    <Flex
      m='5px'
      onClick={handleClick}
      cursor='pointer'
      basis={['100%', '250px']}
      overflow='hidden'
      border='1px'
      direction='column'
      borderColor='lightGray'
      boxShadow='md'
      height='300px'
      borderRadius='lg'
    >
      <Image
        h='80px'
        src={conditions && icons(`./${conditions.WeatherIcon}.svg`).default}
      />
      <Flex
        h='100%'
        justify='space-around'
        align='center'
        direction='column'
        pb='10px'
      >
        <Flex direction='column' align='center'>
          <Heading fontSize='xl' as='strong'>
            {city.cityName}
          </Heading>
          <Text>{conditions?.Temperature.Metric.Value}&#8451;</Text>
        </Flex>
        <Flex>
          <Text as='strong' fontSize='2xl'>
            {conditions?.WeatherText}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default React.memo(CityBox);
