import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authSlice from './AuthSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
