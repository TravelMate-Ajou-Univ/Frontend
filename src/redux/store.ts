import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import mapSlice from "./features/mapSlice";
import bookmarkCollectionListSlice from "./features/bookmarkCollectionListSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    bookmarkCollectionListSlice,
    mapSlice
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
