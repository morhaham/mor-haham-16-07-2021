import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { citiesApi } from './services/cities';
import { conditionsApi } from './services/conditions';
import { forecastsApi } from './services/forecasts';
import weatherReducer from './weatherSlice';

const reducer = combineReducers({
  weather: weatherReducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
  [conditionsApi.reducerPath]: conditionsApi.reducer,
  [forecastsApi.reducerPath]: forecastsApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(citiesApi.middleware)
      .concat(conditionsApi.middleware)
      .concat(forecastsApi.middleware),
});

store.subscribe(() => {
  localStorage.setItem(
    'favoriteCities',
    JSON.stringify(store.getState().weather.favoriteCities)
  );
});

setupListeners(store.dispatch);
