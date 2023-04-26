import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState:{search: string} = {
    search: "",
};

const diskSlice = createSlice({
    name: "disk",
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<{text: string}>) {
            state.search = action.payload.text;
        },
    },
});

export const { setSearchText } = diskSlice.actions;

export default diskSlice;