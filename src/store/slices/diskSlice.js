import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    search: "",
    sortType: "",
};

const diskSlice = createSlice({
    name: "disk",
    initialState,
    reducers: {
        changeSearch(state, action) {
            state.search = action.payload.text;
        },
        changeSortType(state, action) {
            state.sortType = action.payload.text;
        },
    },
});

export const { changeSearch, changeSortType, changeCurrentFile } = diskSlice.actions;

export default diskSlice;