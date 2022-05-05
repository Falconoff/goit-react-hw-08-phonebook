/*
import { createSlice } from '@reduxjs/toolkit';

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
    authAction: (state, action) => action.payload,
  },
});

export const { authAction } = authSlice.actions;

// SELECTORS
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
*/
// ----------- HW-8 RTK Query ----------------
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  // tagTypes: ['Auth'],
  endpoints: builder => ({
    // fetchContacts: builder.query({
    //   query: () => `/contacts`,
    //   // providesTags: ['Contacts'],
    // }),
    registerUser: builder.mutation({
      query: newUser => ({
        url: `/users/signup`,
        method: 'POST',
        body: newUser,
      }),
      // invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: loginData => ({
        url: `/users/login`,
        method: 'POST',
        body: loginData,
      }),
      // invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      query: logoutData => ({
        url: `/users/logout`,
        method: 'POST',
        body: logoutData,
      }),
      // invalidatesTags: ['Auth'],
    }),
    getUser: builder.query({
      query: token => ({
        url: `/users/current`,
        method: 'GET',
        body: token,
      }),
      // invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
} = authApi;

// SELECTORS
// export const getIsLoggedIn = state => state.auth.isLoggedIn;
// export const getUserName = state => state.auth.user.name;
