import { SearchIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { useDispatch } from 'react-redux';
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

  const handleSelect = (value, item) => {
    setSearch(value);
    dispatch(setCurrentCity(item));
  };

  return (
    <Container centerContent mb={10}>
      <Box width='100%'>
        <ReactAutocomplete
          items={cities || []}
          shouldItemRender={(item, search) =>
            item?.LocalizedName.toLowerCase().indexOf(search?.toLowerCase()) >
            -1
          }
          getItemValue={(item) => item?.LocalizedName}
          renderItem={(item, highlighted) => (
            <Flex
              py='5px'
              px='10px'
              key={item.Key}
              color='black'
              borderRadius='lg'
              backgroundColor={highlighted ? '#eee' : 'transparent'}
              cursor='pointer'
              fontSize='lg'
            >
              {item?.LocalizedName}
            </Flex>
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          renderInput={(props) => (
            <Flex align='center' position='relative'>
              <SearchIcon position='absolute' left='15px' />
              <Input paddingLeft='38px' borderRadius='lg' {...props} />
            </Flex>
          )}
          wrapperStyle={{ width: '100%' }}
          onSelect={handleSelect}
        />
      </Box>
    </Container>
  );
};

export default Search;
