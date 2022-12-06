import { createAsyncThunk } from '@reduxjs/toolkit';
import * as auth from 'auth';
import { Notify } from 'notiflix';

export const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await auth.signUp(credentials);

    auth.token.set(data.token);

    return data;
  } catch (error) {
    const { message = 'Registration failed, try again later' } = error;
    Notify.failure(message);
  }
});
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await auth.logIn(credentials);
      auth.token.set(data.token);
      return data;
    } catch (error) {
      const { message = 'Wrong email or password!' } = error;
      return rejectWithValue(message);
    }
  }
);
export const logOut = createAsyncThunk('auth/logOut', async credentials => {
  try {
    const { data } = await auth.logOut(credentials);
    auth.token.unset();
    return data;
  } catch (error) {
    const { message = 'Failed to log out!' } = error;
    Notify.failure(message);
  }
});
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { token: persistedToken },
    } = getState();

    if (!persistedToken) return rejectWithValue('no token saved');
    try {
      auth.token.set(persistedToken);
      const { data } = await auth.getCurrentUser();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
