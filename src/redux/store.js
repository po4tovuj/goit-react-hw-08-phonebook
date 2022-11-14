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
import { filterReducer } from 'redux/filterSlice';
import { contactReducer } from 'redux/contactsSlice';
import authReducer from 'redux/auth/auth-slice';
const contactsPersistConfig = {
  key: 'contacts',
  storage,
};
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    contacts: persistReducer(contactsPersistConfig, contactReducer),
    auth: persistReducer(authPersistConfig, authReducer),
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
