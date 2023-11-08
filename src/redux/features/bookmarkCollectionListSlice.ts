import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  BookmarkCollectionType,
  BookmarkCollectionListType,
  VisibilityType
} from "@/model/bookmark";
type InitialState = BookmarkCollectionListType;

const initialBookmarkCollectionList: InitialState = {
  bookmarkCollections: [],
  view: "",
  count: 0
};

const bookmarkCollectionSlice = createSlice({
  name: "bookmarkCollectionList",
  initialState: initialBookmarkCollectionList,
  reducers: {
    setBookmarkCollectionList: (
      state,
      action: PayloadAction<BookmarkCollectionListType>
    ) => {
      state.bookmarkCollections = action.payload.bookmarkCollections.map(
        collection => {
          return {
            ...collection,
            visibility: collection.visibility.toLowerCase() as VisibilityType
          };
        }
      );
      state.count = action.payload.count;
    },
    setBookmarkCollectionView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    addBookmarkCollection: (
      state,
      action: PayloadAction<BookmarkCollectionType>
    ) => {
      state.bookmarkCollections = [
        action.payload,
        ...state.bookmarkCollections
      ];
    }
  }
});

export const {
  setBookmarkCollectionList,
  setBookmarkCollectionView,
  addBookmarkCollection
} = bookmarkCollectionSlice.actions;

export default bookmarkCollectionSlice.reducer;
