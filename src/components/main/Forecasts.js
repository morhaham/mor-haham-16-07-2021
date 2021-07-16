import { Flex, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import useError from '../../hooks/useError';
import { useGetForecastsByCityKeyQuery } from '../../state/services/forecasts';
import DayBox from './DayBox';

const Forecasts = ({ city }) => {
  const {
    data: forecasts,
    error,
    isLoading,
  } = useGetForecastsByCityKeyQuery(city?.cityKey);
  useError({
    msgTitle: 'Could not fetch forecasts.',
    msgDesc: 'Maybe exceeded 50 calls.',
    error,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex size='2xl' justify='center'>
        <Heading
          fontSize='3xl'
          textAlign='center'
          color='main.500'
          textShadow='1px 1px 10px rgba(0,0,0,0.2)'
        >
          {forecasts?.Headline.Text}
        </Heading>
      </Flex>
      <Flex wrap='wrap' justify='center'>
        {forecasts?.DailyForecasts.map((f, i) => (
          <DayBox key={i} forecast={f} />
        ))}
      </Flex>
    </>
  );
};

export default React.memo(Forecasts);
