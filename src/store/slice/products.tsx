import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductsStateType } from "../../types/ProductsType";

const initialState: ProductsStateType = {
  cards: [],
  scrollArrayContainer: [],
  sliderArrayContainer: [],
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<ItemType[]>) => {
      state.sliderArrayContainer.push(action.payload);
      state.sliderArrayContainer.forEach((el) =>
        el.forEach((item) => state.cards.push(item))
      );
      const sort = state.cards.sort(() => Math.random() - 0.5);
      state.cards = sort;
    },

    getScrollArray: (state, action: PayloadAction<ItemType[]>) => {
      action.payload.map((item) => state.scrollArrayContainer.push(item));
    },
    setSortPopularCards: (state) => {
      const sort = state.cards.sort((a, b) => b.rating - a.rating);
      state.cards = sort;
    },
    setSortAscendingCards: (state) => {
      const sort = state.cards.sort((a, b) => a.price - b.price);
      state.cards = sort;
    },
    setSortDescendingCards: (state) => {
      const sort = state.cards.sort((a, b) => b.price - a.price);
      state.cards = sort;
    },
  },
});
export const {
  getScrollArray,
  getProducts,
  setSortPopularCards,
  setSortDescendingCards,
  setSortAscendingCards,
} = products.actions;
export default products.reducer;
