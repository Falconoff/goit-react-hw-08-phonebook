// ----------- HW-8 RTK Query ----------------

// import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import { authApi } from './auth/authApi';
import { authSlice, authApi } from './auth/authApi';

import { contactsApi } from './contacts/contactsApi';
import { filterSlice } from './filter/filterSlice';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
// const persistedContactsReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    // auth: authSlice.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlice.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // authApi.middleware,
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
