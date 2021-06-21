import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  descriptions: [],
};

const descriptionsSlice = createSlice({
  name: 'cardDescriptions',
  initialState,
  reducers: {
    addDescription(state, { payload }) {
      state.descriptions.push(payload);
    },
    removeDescription(state, { payload }) {
      state.descriptions.forEach((item, index) => {
        if (item.id === payload) {
          state.descriptions.splice(index, 1);
        }
      });
    },
    updateDescription(state, { payload }) {
      state.descriptions.forEach((item) => {
        if (item.id === payload.id) {
          item.body = payload.body;
        }
      });
    },
  },
});

export const { addDescription, removeDescription, updateDescription } =
  descriptionsSlice.actions;

export default descriptionsSlice.reducer;
