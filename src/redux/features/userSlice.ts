import { User } from "@/model/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUser: User = {
  userName: "",
  profileImageId: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
