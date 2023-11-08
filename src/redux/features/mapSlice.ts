import { BookmarkType, PinType } from "@/model/bookmark";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  markers: BookmarkType[];
  deleteMarker: number[];
  pins: PinType[];
};

const InitialMap: InitialState = {
  markers: [],
  deleteMarker: [],
  pins: []
};

const mapSlice = createSlice({
  name: "map",
  initialState: InitialMap,
  reducers: {
    setPins: state => {
      state.pins = [];
    },
    addPins: (state, action: PayloadAction<PinType>) => {
      state.pins = [...state.pins, action.payload];
    },
    subPins: (state, action: PayloadAction<PinType>) => {
      state.pins.filter(
        pin =>
          pin.latitude !== action.payload.latitude &&
          pin.longitude !== action.payload.longitude
      );
    },
    subMarkers: (state, action: PayloadAction<BookmarkType>) => {
      state.deleteMarker = [...state.deleteMarker, action.payload.id];
    }
  }
});

export const { setPins, addPins, subPins, subMarkers } = mapSlice.actions;

export default mapSlice.reducer;
