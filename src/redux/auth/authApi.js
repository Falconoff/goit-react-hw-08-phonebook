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
      state.isLoggedIn = true;
    },
    authAction: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    loginAction: (state, action) => {
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
  //   extraReducers: builder => {
  //     builder.addMatcher(
  //       authApi.endpoints.registerUser.matchFulfilled,
  //       (state, { payload }) => {
  //         state.user = payload.user;
  //         state.token = payload.token;
  //         state.isLoggedIn = true;
  //       }
  //     );
  //     builder.addMatcher(
  //       authApi.endpoints.loginUser.matchFulfilled,
  //       (state, { payload }) => {
  //         state.user = payload.user;
  //         state.token = payload.token;
  //         state.isLoggedIn = true;
  //       }
  //     );
  //     builder.addMatcher(
  //       authApi.endpoints.logoutUser.matchFulfilled,
  //       (state, _) => {
  //         state.user = { name: null, email: null };
  //         state.token = null;
  //         state.isLoggedIn = false;
  //       }
  //     );
  //     builder.addMatcher(
  //       authApi.endpoints.fetchCurrentUser.matchFulfilled,
  //       (state, { payload }) => {
  //         state.user = payload;
  //         state.isLoggedIn = true;
  //       }
  //     );
  //   },
});

export const { getCurrentUserAction, authAction, loginAction, logoutAction } =
  authSlice.actions;

// SELECTORS
// export const getIsLoggedIn = state => state.auth.isLoggedIn;
// export const getUserName = state => state.auth.user.name;

// ----------- RTK Query ----------------
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
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
      query: () => `/users/current`,
      // invalidatesTags: ['Auth'],
      providesTags: ['Auth'],
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
  // useTempFetchCurrentUserMutation,
  useFetchCurrentUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;

// SELECTORS
// export const getIsLoggedIn = state => state.auth.isLoggedIn;
// export const getUserName = state => state.auth.user.name;
