import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoPayloadType, UserStateType } from "../../types/UserInfoType";

const initialState: UserStateType = {
  user: {
    cart: [],
    favorites: [],
    firstName: "",
    lastName: "",
    orders: [{ id: "", details: [], items: [{ id: "", amount: 0 }] }],
  },
};

export const UserInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfoObject: (state, action: PayloadAction<UserInfoPayloadType>) => {
      state.user = action.payload;
    },
  },
});
export const { getUserInfoObject } = UserInfo.actions;
export default UserInfo.reducer;
