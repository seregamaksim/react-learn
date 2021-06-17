import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/Users';
import boardsReducer from './reducers/Boards';
import boardCardsReducer from './reducers/BoardCards';
import boardCardsDescriptionsReducer from './reducers/BoardCardsDescription';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReducer,
    boardCards: boardCardsReducer,
    boardCardsDescriptions: boardCardsDescriptionsReducer,
  },
});
