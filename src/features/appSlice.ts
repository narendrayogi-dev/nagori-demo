// store/slices/appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isFirstTime: boolean | null;
}

const initialState: AppState = {
  isFirstTime: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsFirstTime(state, action: PayloadAction<boolean>) {
      state.isFirstTime = action.payload;
    },
  },
});

export const { setIsFirstTime } = appSlice.actions;
export default appSlice.reducer;
