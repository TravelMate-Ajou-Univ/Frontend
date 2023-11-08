import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  BookmarkCollectionType,
  BookmarkCollectionListType,
  VisibilityType
} from "@/model/bookmark";
type InitialState = {
  collections: BookmarkCollectionType[];
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
      action: PayloadAction<BookmarkCollectionListType>
    ) => {
      // state.collections = action.payload.bookmarkCollections;
      state.collections = action.payload.bookmarkCollections.map(collection => {
        return {
          ...collection,
          visibility: collection.visibility.toLowerCase() as VisibilityType
        };
      });
      state.count = action.payload.count;
    },
    setBookmarkSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addBookmarkCollection: (
      state,
      action: PayloadAction<BookmarkCollectionType>
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
