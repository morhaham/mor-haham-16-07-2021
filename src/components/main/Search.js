import { Box, Container } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import useError from '../../hooks/useError';
import { useGetCityByNameQuery } from '../../state/services/cities';
import { setCurrentCity } from '../../state/weatherSlice';

const Search = () => {
  const [search, setSearch] = useState('');
  const { data: cities, error } = useGetCityByNameQuery(search, {
    skip: !search,
  });
  const dispatch = useDispatch();
  useError({
    msgTitle: 'Could not fetch search autocomplete.',
    msgDesc: 'Maybe exceeded 50 calls.',
    error,
  });

  const handleOnSelect = ({ name, key }) => {
    dispatch(setCurrentCity({ cityName: name, cityKey: key }));
  };

  const handleOnSearch = (search, _) => {
    setSearch(search);
  };

  return (
    <Container centerContent mb={10}>
      <Box width='60%' minW='250px'>
        <ReactSearchAutocomplete
          items={cities}
          onSelect={handleOnSelect}
          onSearch={handleOnSearch}
          placeholder='Start entering a city name :)'
          fuseOptions={{ keys: ['LocalizedName'] }}
          resultStringKeyName='LocalizedName'
          autoFocus
        />
      </Box>
    </Container>
  );
};

export default Search;
