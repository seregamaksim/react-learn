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
  },
});

export const { addDescription } = descriptionsSlice.actions;

export default descriptionsSlice.reducer;
