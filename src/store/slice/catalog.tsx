import { createSlice } from "@reduxjs/toolkit";
import { CatalogStateType } from "../../types/CategoryType";

const initialState: CatalogStateType = {
  obj: [],
};

export const catalog = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    getCatalogObject: (state, action) => {
      state.obj = action.payload;
    },
  },
});
export const { getCatalogObject } = catalog.actions;
export default catalog.reducer;
