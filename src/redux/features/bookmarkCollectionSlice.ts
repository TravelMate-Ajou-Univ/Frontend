import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookmarkCollection, BookmarkCollectionList } from "@/model/bookmark";
type InitialState = {
  collections: BookmarkCollection[];
  count: number;
};
const initialBookmarkCollection: InitialState = {
  collections: [],
  count: 0
};

const bookmarkCollectionSlice = createSlice({
  name: "bookmarkCollection",
  initialState: initialBookmarkCollection,
  reducers: {
    setBookmarkCollection: (
      state,
      action: PayloadAction<BookmarkCollectionList>
    ) => {
      state.collections = action.payload.bookmarkCollections;
      state.count = action.payload.count;
    },
    addBookmarkCollection: (
      state,
      action: PayloadAction<BookmarkCollection>
    ) => {
      state.collections = [action.payload, ...state.collections];
    }
  }
});

export const { setBookmarkCollection, addBookmarkCollection } =
  bookmarkCollectionSlice.actions;

export default bookmarkCollectionSlice.reducer;
