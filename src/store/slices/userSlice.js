import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: null,
    token: null,
    id: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
})

export const { } = userSlice.actions;

export default userSlice;