import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    search: "",
    sortType: "",
};

const diskSlice = createSlice({
    name: "disk",
    initialState,
    reducers: {
        setSearchText(state, action) {
            state.search = action.payload.text;
        },
        setSortType(state, action) {
            state.sortType = action.payload.text;
        },
    },
});

export const { setSearchText, changeSortType } = diskSlice.actions;

export default diskSlice;