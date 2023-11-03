import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookmarkCollection, BookmarkCollectionList } from "@/model/bookmark";
type InitialState = {
  collections: BookmarkCollection[];
  search: string;
  count: number;
};
const initialBookmarkCollection: InitialState = {
  collections: [],
  search: "",
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
    setBookmarkSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addBookmarkCollection: (
      state,
      action: PayloadAction<BookmarkCollection>
    ) => {
      state.collections = [action.payload, ...state.collections];
    }
  }
});

export const {
  setBookmarkCollection,
  setBookmarkSearch,
  addBookmarkCollection
} = bookmarkCollectionSlice.actions;

export default bookmarkCollectionSlice.reducer;
