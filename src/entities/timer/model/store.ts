import { configureStore } from '@reduxjs/toolkit';
import { timerApi } from '../services';
import timerReducer from '../services/timerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      timer: timerReducer,
      [timerApi.reducerPath]: timerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(timerApi.middleware),
    devTools: true,
  });
};
