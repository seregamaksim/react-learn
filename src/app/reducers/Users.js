import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: null,
  filteredUsers: [],
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  let response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      state.users.unshift(payload);
      state.filteredUsers.unshift(payload);
    },
    removeUser(state, { payload }) {
      state.users.forEach((user, index) => {
        if (user.id === payload) {
          state.users.splice(index, 1);
          state.filteredUsers.splice(index, 1);
        }
      });
    },
    filterUsers(state, { payload }) {
      // if (payload.type === 'name') {
      //   state.filteredUsers = state.users.filter((user) => {
      //     return user.name.toLowerCase().includes(payload.value.toLowerCase());
      //   });
      // } else if (payload.type === 'company') {
      //   state.filteredUsers = state.users.filter((user) => {
      //     return user.company.name
      //       .toLowerCase()
      //       .includes(payload.value.toLowerCase());
      //   });
      // } else if (payload.type === 'city') {
      //   state.filteredUsers = state.users.filter((user) => {
      //     return user.address.city
      //       .toLowerCase()
      //       .includes(payload.value.toLowerCase());
      //   });
      // }
      state.filteredUsers = state.users.filter((user) => {
        if (payload.type === 'name') {
          return user.name.toLowerCase().includes(payload.value.toLowerCase());
        } else if (payload.type === 'company') {
          return user.company.name
            .toLowerCase()
            .includes(payload.value.toLowerCase());
        } else if (payload.type === 'city') {
          return user.address.city
            .toLowerCase()
            .includes(payload.value.toLowerCase());
        }
        return true;
      });
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.users = payload;
      state.filteredUsers = payload;
    },
  },
});

export const selectUsers = (state) => state.users.users;
export const selectFilteredUsers = (state) => state.users.filteredUsers;

export const { addUser, removeUser, filterUsers } = usersSlice.actions;

export default usersSlice.reducer;
