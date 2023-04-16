import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    messages: []
};

const poputMessageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push({ text: action.payload.text, type: action.payload.type, id: action.payload.id,});
        },
        removeMessage(state, action) {
            state.messages = state.messages.filter((messages) => messages.id !== action.payload.id);
        }
    },
});

export const { addMessage, removeMessage} = poputMessageSlice.actions;

export default poputMessageSlice;