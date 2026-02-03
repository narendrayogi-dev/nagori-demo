import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { persistor } from '../store/store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';
export const BASE_URL: string = 'http://147.93.20.138:6069/api/v1/';
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

// TypeScript-safe extended query Fn
export const baseQueryWithAuth: BaseQueryFn<
  FetchArgs & { silent?: boolean }, // custom args
  unknown, // response
  FetchBaseQueryError // error type
> = async (args, api, extraOptions) => {
  const silent = args?.silent || extraOptions?.silent;

  // 📡 Internet Check
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected && !silent) {
    Toast.show({
      type: 'error',
      text1: 'No Internet',
      text2: 'Please check your network connection.',
    });

    return {
      error: {
        status: 'NO_INTERNET',
        data: { message: 'Offline' },
      },
    };
  }

  const token = (api.getState() as RootState).auth?.token;

  const headers = new Headers(args.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  args.headers = headers;

  // 🌐 Perform request
  const result = await baseQuery(args, api, extraOptions);

  console.log('%cAPI-INFO', 'color: #4CAF50; font-weight: bold;', result);

  // 🔥 Handle Unauthorized (logout)
  // if (result?.error?.status === 401) {
  //   if (!silent) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Session Expired',
  //       text2: 'Please login again.',
  //     });
  //   }

  //   await persistor.purge();
  //   // api.dispatch(logoutOutUser());
  // }

  // 🎉 Success messages
  if (
    (result as any)?.data?.message &&
    (result as any)?.meta?.response?.ok &&
    (result as any)?.meta?.request?.method !== 'GET' &&
    !silent
  ) {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: result?.data?.message || '',
    });
  }

  // ❌ App/Server Error
  if (result?.error && !silent) {
    const err = result.error as FetchBaseQueryError & {
      data?: any;
    };

    const firstError = err.data?.errors
      ? Object.values(err.data.errors)[0]
      : err.data?.error || err.data?.message || 'Something went wrong';

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: String(firstError),
    });
  }

  // 🌐 Parsing / Network / Fetch errors
  if (
    result?.error &&
    ['FETCH_ERROR', 'PARSING_ERROR', 'NETWORK_ERROR'].includes(
      result.error.status as string,
    ) &&
    !silent
  ) {
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: (result.error as any)?.message || (result.error as any)?.error,
    });
  }

  return result;
};
