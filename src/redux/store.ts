import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import mapSlice from "./features/mapSlice";
import bookmarkCollectionListSlice from "./features/bookmarkCollectionListSlice";
import chatRoomSlice from "./features/chatRoomSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    bookmarkCollectionListSlice,
    mapSlice,
    chatRoomSlice
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
