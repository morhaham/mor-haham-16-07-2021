import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = process.env.REACT_APP_WHEATHER_APIKEY;

export const forecastsApi = createApi({
  reducerPath: 'forecastsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day',
  }),
  endpoints: (builder) => ({
    getForecastsByCityKey: builder.query({
      query: (cityKey) => `/${cityKey}?apikey=${apiKey}`,
    }),
  }),
});

export const { useGetForecastsByCityKeyQuery } = forecastsApi;
