import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [
    { id: 1, title: 'Need' },
    { id: 2, title: 'In progress' },
    { id: 3, title: 'Done' },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard(state, { payload }) {
      state.boards.push(payload);
    },
    removeBoard(state, { payload }) {
      state.boards.forEach((item, index) => {
        if (item.id === payload) {
          state.boards.splice(index, 1);
        }
      });
    },
  },
});

export const selectBoards = (state) => state.boards.boards;

export const { addBoard, removeBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
