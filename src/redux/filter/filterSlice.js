import { createSlice } from '@reduxjs/toolkit';

const initialState = 'qwe';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAction: (state, action) => action.payload,
  },
});

export const { filterAction } = filterSlice.actions;

// SELECTORS
export const getFilterValue = state => state.filter;
