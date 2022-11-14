import { createAsyncThunk } from '@reduxjs/toolkit';
import * as auth from 'auth';
import axios from 'axios';
import { Notify } from 'notiflix';

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await auth.signUp(credentials);
    auth.token.set(data.token);

    return data;
  } catch (error) {
    const { message = 'Registration failed, try again later' } = error;
    Notify.failure(message);
  }
});
const logIn = createAsyncThunk('auth/logIn', async credentials => {
  try {
    const { data } = await auth.logIn(credentials);
    auth.token.set(data.token);
    return data;
  } catch (error) {
    const { message = 'Wrong email or password!' } = error;
    Notify.failure(message);
  }
});
const logOut = createAsyncThunk('auth/logOut', async credentials => {
  try {
    const { data } = await auth.logIn(credentials);
    auth.token.unset();
    return data;
  } catch (error) {
    const { message = 'Failed to log out!' } = error;
    Notify.failure(message);
  }
});
const fetchCurrentUser = createAsyncThunk(
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

const operations = {
  logIn,
  logOut,
  register,
  fetchCurrentUser,
};
export default operations;
