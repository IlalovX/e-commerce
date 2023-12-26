import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../types/ItemType";
import { FavoritesStateType } from "../../types/FavoritesType";

const initialState: FavoritesStateType = {
  favoritesList: [],
};

export const favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    getFavoritesList: (state, action: PayloadAction<ItemType>) => {
      state.favoritesList.push(action.payload);
    },
  },
});
export const { getFavoritesList } = favorites.actions;
export default favorites.reducer;
