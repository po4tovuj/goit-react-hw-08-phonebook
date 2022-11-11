import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';

const contactsInitialState = { contacts: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer({ contacts }, { payload }) {
        contacts.push(payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: shortid.generate(),
            name,
            number,
          },
        };
      },
    },
    deleteContact({ contacts }, { payload }) {
      const idx = contacts.findIndex(contact => contact.id === payload);
      contacts.splice(idx, 1);
    },
  },
});
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
