import { User } from "@/model/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialUser: User = {
  id: 0,
  userName: "",
  profileImageId: "",
  level: "USER"
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
    userLogout(state) {
      return initialUser;
    }
  }
});

export const { setUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
