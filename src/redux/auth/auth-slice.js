import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};
const handleLoggedInSuccess = (state, { payload: { user, token } }) => {
  state = { ...state, user, token, isLoggedIn: true };
  return state;
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(authOperations.register.fulfilled, handleLoggedInSuccess)
      .addCase(authOperations.logIn.fulfilled, handleLoggedInSuccess)
      .addCase(authOperations.logOut.fulfilled, state => {
        state = { ...initialState };
        return state;
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, { payload }) => {
          state.user = { ...payload };
          state.isLoggedIn = true;
        }
      );
  },
});
export default authSlice.reducer;
