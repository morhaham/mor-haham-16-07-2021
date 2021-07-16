import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCity: null,
  favoriteCities: [],
};

// using the Immer library we can "mutate" the state directly
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentCity: (state, { payload }) => {
      const city = state.favoriteCities.find(
        (c) => c.cityKey === payload.cityKey
      );
      state.currentCity = city || payload;
    },
    addFavoriteCity: (state, { payload }) => {
      state.favoriteCities.push({ ...payload, isFavorite: true });
      state.currentCity.isFavorite = true;
    },
    removeFavoriteCity: (state, { payload }) => {
      state.favoriteCities = state.favoriteCities?.filter(
        (c) => c.cityKey !== payload.cityKey
      );
      state.currentCity.isFavorite = false;
    },
    hydrateFavoriteCities: (state, { payload }) => {
      state.favoriteCities = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentCity,
  addFavoriteCity,
  removeFavoriteCity,
  hydrateFavoriteCities,
} = weatherSlice.actions;

export default weatherSlice.reducer;
