import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
    repeatPassword: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { }
});

export const { } = authSlice.actions;

export default authSlice;