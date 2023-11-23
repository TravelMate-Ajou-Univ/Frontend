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
    latitude: 0,
    longitude: 0
  }
};

const mapSlice = createSlice({
  name: "map",
  initialState: InitialMap,
  reducers: {
    setCenter: (state, action: PayloadAction<LocationType>) => {
      state.center = action.payload;
    },
    initPins: state => {
      state.pins = [];
    },
    addPins: (state, action: PayloadAction<PinType>) => {
      state.pins = [...state.pins, action.payload];
    },
    subPins: (state, action: PayloadAction<PinType>) => {
      state.pins = state.pins.filter(
        pin =>
          pin.latitude !== action.payload.latitude &&
          pin.longitude !== action.payload.longitude
      );
    },
    initBookmarks: state => {
      state.bookmarks = [];
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
  initPins,
  addPins,
  subPins,
  initBookmarks,
  setBookmarks,
  subBookmarks,
  setDeleteBookmarks
} = mapSlice.actions;

export default mapSlice.reducer;
