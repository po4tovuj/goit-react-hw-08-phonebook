import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ContactsApi from 'contactsApi';

export const fetchAll = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('ContactsApi: ', ContactsApi.getContacts);
      const contacts = await ContactsApi.getContacts('/contacts');
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const data = await ContactsApi.addContact('/contacts', {
        name,
        number,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const data = await ContactsApi.deleteContact(`contacts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateContact = createAsyncThunk(
  'contacts/editContact',
  async (payload, thunkAPI) => {
    try {
      const data = await ContactsApi.editContact(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
