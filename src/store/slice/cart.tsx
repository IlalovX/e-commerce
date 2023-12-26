import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartStateType } from "../../types/CartType";
import { ItemType } from "../../types/ItemType";

const initialState: CartStateType = {
  cartsList: [],
  price: 0,
  count: 0,
  items: [{ id: "", amount: 0 }],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartsList: (state, action: PayloadAction<ItemType>) => {
      state.cartsList.push(action.payload);
      const arr = state.cartsList.map((el) => ({ ...el, amount: 1 }));
      state.cartsList = arr;

      state.cartsList.forEach((el) => {
        state.price += el.price * (el.amount as number);
        state.count += el.amount as number;
      });

      const order = state.cartsList.map((el) => ({
        id: el.id,
        amount: el.amount,
      }));

      state.items = order;
    },
    setDecrementAmountOrder: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartsList.map((el) => {
        if (el.id === id) {
          if ((el.amount as number) >= 2) {
            el.amount = (el.amount as number) - 1;
          } else {
            el.amount = 1;
          }
        }
      });
      const order = state.cartsList.map((el) => ({
        id: el.id,
        amount: el.amount,
      }));
      state.items = order;
      state.price = 0;
      state.count = 0;

      state.cartsList.forEach((el) => {
        state.price += Number(el.price) * Number(el.amount);
        state.count += el.amount as number;
      });
    },
    setIncrementAmountOrder: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartsList.map((el) => {
        if (el.id === id) {
          el.amount = (el.amount as number) + 1;
        }
      });
      const order = state.cartsList.map((el) => ({
        id: el.id,
        amount: el.amount,
      }));
      state.items = order;
      state.price = 0;
      state.count = 0;

      state.cartsList.forEach((el) => {
        state.price += Number(el.price) * Number(el.amount);
        state.count += el.amount as number;
      });
    },
    clearArray: (state) => {
      state.items = [{ amount: 0, id: "" }];
      state.price = 0;
      state.count = 0;
      state.cartsList = [];
    },
  },
});

export const {
  getCartsList,
  setDecrementAmountOrder,
  setIncrementAmountOrder,
  clearArray,
} = cart.actions;

export default cart.reducer;
