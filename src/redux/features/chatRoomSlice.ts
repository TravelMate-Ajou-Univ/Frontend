import { PayloadAction } from "@reduxjs/toolkit";
import { ChatRoomType } from "@/model/chat";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  chatrooms: ChatRoomType[];
  count: number;
};
const InitialChatRoom: InitialState = {
  chatrooms: [],
  count: 0
};
const chatRoomSlice = createSlice({
  name: "chatroom",
  initialState: InitialChatRoom,
  reducers: {
    setChatRoom: (state, action: PayloadAction<ChatRoomType[]>) => {
      state.chatrooms = action.payload;
    },
    addChatRoom: (state, action: PayloadAction<ChatRoomType>) => {
      state.chatrooms = [action.payload, ...state.chatrooms];
    }
  }
});

export const { setChatRoom, addChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
