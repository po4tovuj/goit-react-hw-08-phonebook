import { createSlice } from '@reduxjs/toolkit';

import { fetchAll, addContact, deleteContact } from './operations';
import sortBy from 'lodash.sortby';
const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
function isPendingAction(action) {
  return action.type.endsWith('/pending');
}
function isRejectAction(action) {
  return action.type.endsWith('/rejected');
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.items = sortBy(payload, 'name');
        return state;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        console.log('payload: ', payload);
        // state.items.push(payload);
        state.items = sortBy([...state.items, payload], 'name');
        return;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
