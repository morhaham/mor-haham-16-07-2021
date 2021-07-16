import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = process.env.REACT_APP_WHEATHER_APIKEY;

export const conditionsApi = createApi({
  reducerPath: 'conditionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dataservice.accuweather.com/currentconditions/v1',
  }),
  endpoints: (builder) => ({
    getConditionsByCityKey: builder.query({
      query: (cityKey) => `/${cityKey}?apikey=${apiKey}`,
    }),
  }),
});

export const { useGetConditionsByCityKeyQuery } = conditionsApi;
