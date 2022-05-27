import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";
import { counterReducer } from "./slice/counter";
import { shopReducer } from "./slice/shop";

const store = configureStore({
  reducer: { counter: counterReducer, shop: shopReducer, auth: authReducer }
});

store.subscribe(() => {
  localStorage.setItem("basket", JSON.stringify(store.getState().shop.basket));
});

export default store;
