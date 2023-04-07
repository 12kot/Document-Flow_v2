import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    search: "",
    sortType: "",
    shareFileText: "",
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
        setShareFileText(state, action) {
            state.shareFileText = action.payload.text;
        },
    },
});

export const { setSearchText, changeSortType, setShareFileText } = diskSlice.actions;

export default diskSlice;