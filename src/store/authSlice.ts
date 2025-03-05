// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AuthState, User} from "@/types/types.ts";

const initialState: AuthState = {
  user: null,
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      console.log(state.user);
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setAuthToken, setUser, clearAuthToken, clearUser } = authSlice.actions;
export default authSlice.reducer;
