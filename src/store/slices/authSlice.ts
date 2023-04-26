import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  email: string,
  password: string,
  repeatPassword: string
}

type TextType = {
  text: string;
}

const initialState: AuthState = {
  email: "",
  password: "",
  repeatPassword: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmail(state, action: PayloadAction<TextType>) {
      state.email = action.payload.text;
    },
    changePass(state, action: PayloadAction<TextType>) {
      state.password = action.payload.text;
    },
    changeRepeatPass(state, action: PayloadAction<TextType>) {
      state.repeatPassword = action.payload.text;
    },
  },
});

export const { changeEmail, changePass, changeRepeatPass } = authSlice.actions;

export default authSlice;
