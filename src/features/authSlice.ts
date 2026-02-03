import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  role: string;
}


const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isGuest: false,
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string; role?: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isGuest = false;
      state.role = action.payload.role || '';
    },

    skipLogin: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isGuest = true;
      state.role = 'guest';
    },

    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isGuest = false;
      state.role = '';
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setAuthFromStorage: (
      state,
      action: PayloadAction<{ user: User; token: string; role?: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isGuest = false;
      state.role = action.payload.role || '';
    },
  },
});

export const {
  loginSuccess,
  skipLogin,
  logout,
  updateUser,
  setAuthFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
