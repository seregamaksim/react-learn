import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/Users';
import boardsReduces from './reducers/Boards';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReduces,
  },
});
