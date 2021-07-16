import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = process.env.REACT_APP_WHEATHER_APIKEY;

export const citiesApi = createApi({
  reducerPath: 'citiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dataservice.accuweather.com/locations/v1/cities',
  }),
  endpoints: (builder) => ({
    getCityByName: builder.query({
      query: (name) => `/autocomplete?apikey=${apiKey}&q=${name}`,
    }),
    getCurrentPosition: builder.query({
      query: ({ lat, lon }) =>
        `/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`,
    }),
  }),
});

export const { useGetCityByNameQuery, useGetCurrentPositionQuery } = citiesApi;
