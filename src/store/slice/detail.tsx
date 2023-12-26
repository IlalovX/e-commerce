import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../types/ItemType";

const initialState: ItemType = {
  id: "",
  name: "",
  imageUrls: [""],
  rating: 0,
  price: 0,
  availableAmount: 0,
  description: "",
  isInCart: false,
  isFavorite: false,
  category: "",
  subCategory: "",
  amount: 0,
};

export const item = createSlice({
  name: "item",
  initialState,
  reducers: {},
});

export default item.reducer;
