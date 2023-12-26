import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../types/ItemType";
import { SetSortPriceType } from "../../types/CategoryType";
import { SubCardStateType } from "../../types/SubCardType";

const initialState: SubCardStateType = {
  subCardArray: [],
};

export const subCards = createSlice({
  name: "subCards",
  initialState,
  reducers: {
    getArraySubCards: (state, action: PayloadAction<ItemType[]>) => {
      state.subCardArray = action.payload;
    },
    setSortPopularSubCards: (state) => {
      const sort = state.subCardArray.sort(
        (a: ItemType, b: ItemType) => b.rating - a.rating
      );
      state.subCardArray = sort;
    },
    setSortAscendingSubCards: (state) => {
      const sort = state.subCardArray.sort(
        (a: ItemType, b: ItemType) => a.price - b.price
      );
      state.subCardArray = sort;
    },
    setSortDescendingSubCards: (state) => {
      const sort = state.subCardArray.sort(
        (a: ItemType, b: ItemType) => b.price - a.price
      );
      state.subCardArray = sort;
    },
    setSortPriceSubCards: (state, action: SetSortPriceType) => {
      const sort = state.subCardArray.filter((el: ItemType) => {
        if (
          el.price > +action.payload.start &&
          el.price < +action.payload.end
        ) {
          return true;
        } else {
          return false;
        }
      });
      state.subCardArray = sort;
    },
  },
});

export const {
  setSortDescendingSubCards,
  setSortAscendingSubCards,
  setSortPopularSubCards,
  setSortPriceSubCards,
  getArraySubCards,
} = subCards.actions;
export default subCards.reducer;
