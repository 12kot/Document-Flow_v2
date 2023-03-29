import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmail(state, action) {
      state.email = action.payload.text;
    },
    changePass(state, action) {
      state.password = action.payload.text;
    },
    changeRepeatPass(state, action) {
      state.repeatPassword = action.payload.text;
    },
  },
});

export const { changeEmail, changePass, changeRepeatPass } = authSlice.actions;

export default authSlice;
