import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/Users';
import fullUserProfilesReducer from './reducers/FullUserProfiles';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userProfiles: fullUserProfilesReducer,
  },
});
