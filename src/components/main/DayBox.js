import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { icons } from '../../App';

const fahrenheitToCelsius = (fahrenheit) =>
  parseInt(((fahrenheit - 32) * 5) / 9);

const DayBox = ({ forecast }) => {
  const { Date: fDate, Temperature: tmp, Day } = forecast;
  const day = new Date(fDate).toString().split(' ')[0];
  const minTemp = tmp.Minimum.Value;
  const maxTemp = tmp.Maximum.Value;
  const iconFilter = useColorModeValue(
    'none',
    'invert(100%) sepia(0%) saturate(7443%) hue-rotate(198deg) brightness(126%) contrast(112%)'
  );
  return (
    <Flex
      basis={['100%', '180px']}
      overflow='hidden'
      border='1px'
      m='20px'
      direction='column'
      borderColor='lightGray'
      boxShadow='md'
      borderRadius='lg'
    >
      <Image
        filter={iconFilter}
        h='80px'
        src={icons(`./${Day?.Icon}.svg`).default}
      />
      <Flex justify='center' align='center' direction='column' pb='10px'>
        <Text as='strong'>{day}</Text>
        <Text>
          {fahrenheitToCelsius(minTemp)}&#8451; - {fahrenheitToCelsius(maxTemp)}
          &#8451;
        </Text>
      </Flex>
    </Flex>
  );
};

export default React.memo(DayBox);
