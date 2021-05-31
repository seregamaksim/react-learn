import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: null,
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  let response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  return response.data;
  // .then(({ data }) => setUsers(data));
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      state.users.unshift(payload);
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.users = payload;
    },
  },
});

export const selectUsers = (state) => state.users.users;

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
