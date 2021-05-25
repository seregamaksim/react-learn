import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/Users';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
