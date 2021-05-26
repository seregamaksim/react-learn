import axios from 'axios';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
const initialState = {
  userProfiles: [],
};

export const getFullUserProfile = createAsyncThunk(
  'fullUserProfiles/getProfile',
  async (userId, { getState }) => {
    const state = getState();
    console.log('etUserById(state, userId)', getUserById(state, userId));
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  }
);

export const fullUserProfilesSlice = createSlice({
  name: 'userProfiles',
  initialState,
  reducers: {
    // addUser(state, {payload}) {
    //   state.userProfiles.push(payload)
    // }
  },
  extraReducers: {
    [getFullUserProfile.fulfilled]: (state, { payload }) => {
      state.userProfiles.push(payload);
    },
  },
});
export const getAllUserProfiles = (state) => state.userProfiles.userProfiles;

export const getUserById = (state, id) => {
  const users = getAllUserProfiles(state);
  console.log('users state', users);
  return users.find((item) => item.id === id);
};

export default fullUserProfilesSlice.reducer;
