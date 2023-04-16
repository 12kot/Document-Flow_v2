import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    search: "",
};

const diskSlice = createSlice({
    name: "disk",
    initialState,
    reducers: {
        setSearchText(state, action) {
            state.search = action.payload.text;
        },
    },
});

export const { setSearchText } = diskSlice.actions;

export default diskSlice;