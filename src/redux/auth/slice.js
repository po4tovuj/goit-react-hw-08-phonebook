import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
const initialState = {
  user: { name: null, email: null },
  isRefreshing: false,
  token: null,
  isLoggedIn: false,
};
const handleLoggedInSuccess = (state, { payload: { user, token } }) => {
  state.user = user;
  state.token = token;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};
const isRejectedAction = action => action.type.endsWith('rejected');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
  },
  extraReducers: builder => {
    console.log('builder: ', builder);
    builder
      // .addCase(register.pending, handlePendingAction)
      .addCase(register.fulfilled, handleLoggedInSuccess)
      .addCase(logIn.fulfilled, handleLoggedInSuccess)
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isRefreshing = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
