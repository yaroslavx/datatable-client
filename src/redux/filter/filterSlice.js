import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortProperty: '',
  option: true,
  query: '',
  column: 'name',
  logic: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload.query;
    },
    setColumn: (state, action) => {
      state.column = action.payload.column;
    },
    setLogic: (state, action) => {
      state.logic = action.payload.logic;
    },
    setSort: (state, action) => {
      state.sort = {
        sortProperty: action.payload.sortProperty,
        option: action.payload.option,
      };
    },
  },
});

export const { setQuery, setColumn, setLogic, setSort } = filterSlice.actions;

export default filterSlice.reducer;
