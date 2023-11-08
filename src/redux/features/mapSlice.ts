import { BookmarkType, LocationType, PinType } from "@/model/bookmark";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  bookmarks: BookmarkType[];
  deleteBookmarks: number[];
  pins: PinType[];
  center: LocationType;
};

const InitialMap: InitialState = {
  bookmarks: [],
  deleteBookmarks: [],
  pins: [],
  center: {
    lat: 0,
    lng: 0
  }
};

const mapSlice = createSlice({
  name: "map",
  initialState: InitialMap,
  reducers: {
    setCenter: (state, action: PayloadAction<LocationType>) => {
      state.center = action.payload;
    },
    setPins: state => {
      state.pins = [];
    },
    addPins: (state, action: PayloadAction<PinType>) => {
      state.pins = [...state.pins, action.payload];
    },
    subPins: (state, action: PayloadAction<PinType>) => {
      state.pins = state.pins.filter(
        pin =>
          pin.position.lat !== action.payload.position.lat &&
          pin.position.lng !== action.payload.position.lng
      );
    },
    setBookmarks: (state, action: PayloadAction<BookmarkType[]>) => {
      state.bookmarks = [...action.payload];
    },
    subBookmarks: (state, action: PayloadAction<BookmarkType>) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload.id
      );
      state.deleteBookmarks = [...state.deleteBookmarks, action.payload.id];
    },
    setDeleteBookmarks: state => {
      state.deleteBookmarks = [];
    }
  }
});

export const {
  setCenter,
  setPins,
  addPins,
  subPins,
  setBookmarks,
  subBookmarks,
  setDeleteBookmarks
} = mapSlice.actions;

export default mapSlice.reducer;
