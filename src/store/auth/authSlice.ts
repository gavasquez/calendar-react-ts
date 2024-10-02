import { createSlice } from '@reduxjs/toolkit';

type Status = 'checking' | 'authenticated' | 'not-authenticated';

export interface User {
  uid: string,
  name: string,
  email: string,
  //password: string,
}

export interface AuthState {
  status: Status,
  user: User | null,
  errorMessage: string | undefined,
}

export const authSlice = createSlice({
  name: 'ui',
  initialState: {
    status: 'checking',
    user: null,
    errorMessage: undefined,
  } as AuthState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage =  undefined;
    },
    onLogin: (state, action) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage =  undefined;
    },
    onLogout: (state, action) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage =  action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;