import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: 'users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: credentials => ({
        url: 'users/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation({
      query: credentials => ({
        url: 'users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: credentials => ({
        url: 'users/reset-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyResetOTP: builder.mutation({
      query: credentials => ({
        url: 'users/reset-password/verify-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation, 
  useRegisterMutation, 
  useForgotPasswordMutation, 
  useVerifyOTPMutation, 
  useVerifyResetOTPMutation, 
  useResetPasswordMutation, 
  useLogoutMutation, 
} = authApi;
