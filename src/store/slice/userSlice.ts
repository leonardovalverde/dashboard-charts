import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../services/users/types";

export interface IUserState {
  user: IUser;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    companyId: 0,
    email: "",
    id: 0,
    name: "",
    unitId: 0,
    isLogged: false,
    isAdmin: false,
  } as IUser,
  reducers: {
    setUser: (state: IUser, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
