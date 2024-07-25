import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from './slices/sectionsSlice'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    sections: sectionsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in development
});

export default store;
