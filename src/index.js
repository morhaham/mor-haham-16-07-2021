import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { store } from './state/store';
import { Provider } from 'react-redux';
import { hydrateFavoriteCities } from './state/weatherSlice';
import { theme } from './theme';

const getFavoriteCitiesFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem('favoriteCities');
    if (persistedState) return JSON.parse(persistedState);
    return null;
  } catch (e) {
    console.log(e);
  }
};

const favoriteCities = getFavoriteCitiesFromLocalStorage();
if (favoriteCities) {
  console.log(favoriteCities);
  store.dispatch(hydrateFavoriteCities(favoriteCities));
}

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
