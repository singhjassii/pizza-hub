import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";
import userSlice from "./slices/user";

export const store = () => {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
    },
  });
};
