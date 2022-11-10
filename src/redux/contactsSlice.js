import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';

import { CONTACTS } from './constants';
const contactsInitialState = JSON.parse(localStorage.getItem(CONTACTS)) || [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.push(payload);
      },
      prepare({ name, number }) {
        console.log('number: ', number);
        console.log('name: ', name);
        return {
          payload: {
            id: shortid.generate(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, { payload }) {
      console.log('payload: ', payload);
      // state = state.filter(i => i.id !== payload);
      state.pop(); // const idx = state.findIndex(contact => contact.id === payload);
      // state.splice(idx, 1);
      return state;
    },
  },
});
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
