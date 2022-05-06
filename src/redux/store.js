// ----------- HW-8 RTK Query ----------------

// import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import { authApi } from './auth/authApi';
import { authSlice } from './auth/authApi';

import { contactsApi } from './contacts/contactsSlice';
import { filterSlice } from './filter/filterSlice';

export const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlice.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    // authApi.middleware,
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
