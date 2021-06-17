import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
};

const boardCardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addNewCard(state, { payload }) {
      state.cards.push(payload);
    },
    removeCard(state, { payload }) {
      state.cards.forEach((card, index) => {
        if (card.id === payload) {
          state.cards.splice(index, 1);
        }
      });
    },
    addDescriptionId(state, { payload }) {
      state.cards.forEach((item, index) => {
        if (item.id === payload.cardId) {
          item.description = [payload.id];
        }
      });
    },
    updateTitle(state, { payload }) {
      const { cardId, title } = payload;
      state.cards.forEach((item, index) => {
        if (item.id === cardId) {
          item.text = title;
        }
      });
    },
  },
});

export const { addNewCard, removeCard, addDescriptionId, updateTitle } =
  boardCardsSlice.actions;

export const selectCards = (state) => state.boardCards.cards;

export default boardCardsSlice.reducer;
