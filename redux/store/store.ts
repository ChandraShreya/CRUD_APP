import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import productSlice from "../slice/productSlice";
// import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product:productSlice.reducer
  },
});