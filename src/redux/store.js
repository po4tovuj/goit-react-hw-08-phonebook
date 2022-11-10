import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from 'redux/filterSlice';
import { contactReducer } from 'redux/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});
