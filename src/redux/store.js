import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import thunk from 'redux-thunk';
import { filterReducer } from 'redux/filterSlice';
import { contactReducer } from 'redux/contactsSlice';
const contactsPersistConfig = {
  key: 'contacts',
  storage,
};
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    contacts: persistReducer(contactsPersistConfig, contactReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
