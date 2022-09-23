import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filterReducer from '../redux/filter/filterSlice.js';

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export default store;
