import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import bookmarkCollectionSlice from "./features/bookmarkCollectionSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    bookmarkCollectionSlice
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
