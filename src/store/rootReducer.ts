import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import appSlice from '../features/appSlice';
import { authApi } from '../features/authApi';
import { userApi } from '../features/userApi';

const appReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
