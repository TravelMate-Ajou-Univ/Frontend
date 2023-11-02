import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import counterSlice from "./features/counterSlice";
import bookmarkCollectionSlice from "./features/bookmarkCollectionSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    counter: counterSlice.reducer,
    bookmarkCollectionSlice
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
