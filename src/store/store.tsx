import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/products";
import subCardsReducer from "./slice/subCards";
import detailReducer from "./slice/detail";
import cartReducer from "./slice/cart";
import userInfoReducer from "./slice/userInfo";
import favoritesReducer from "./slice/favorites";
import catalogReducer from "./slice/catalog";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    subCards: subCardsReducer,
    detail: detailReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    userInfo: userInfoReducer,
    catalog: catalogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
