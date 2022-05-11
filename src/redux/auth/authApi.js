import { createSlice } from '@reduxjs/toolkit';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const initialState = '';
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCurrentUserAction: (state, action) => {
      state.user = action.payload;
      // state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    authAction: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    logoutAction: (state, action) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { getCurrentUserAction, authAction, logoutAction } =
  authSlice.actions;

// SELECTORS
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;

// ----------- RTK Query ----------------
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],

  endpoints: builder => ({
    fetchCurrentUser: builder.query({
      // query: () => ({
      //   url: `/users/current`,
      //   method: 'GET',
      query: () => `/users/current`,
      // }),
      providesTags: ['Auth'],
    }),
    tempFetchCurrentUser: builder.mutation({
      // query: () => ({
      //   url: `/users/current`,
      //   method: 'GET',
      query: () => `/users/current`,
      // }),
      // invalidatesTags: ['Auth'],
    }),
    registerUser: builder.mutation({
      query: newUser => ({
        url: `/users/signup`,
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: loginData => ({
        url: `/users/login`,
        method: 'POST',
        body: loginData,
      }),
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useTempFetchCurrentUserMutation,
  useFetchCurrentUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;

// SELECTORS
// export const getIsLoggedIn = state => state.auth.isLoggedIn;
// export const getUserName = state => state.auth.user.name;
