import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  uid: null,
  isLoggedIn: false,
  files: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.accessToken;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;

      if (action.payload.files)
        state.files = action.payload.files;
      else state.files = [];
    },

    addFile(state, action) {
      state.files.push(action.payload);
    },

    removeFile(state, action) {
      state.files = state.files.filter((file) => file.fullPath !== action.payload.path)
    },

    searchFile(state, action) {
      for (let file of state.files)
        if (!file.name.toLowerCase().includes(action.payload.text.toLowerCase())) file.isHiden = true;
        else file.isHiden = false;
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.files = [];
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, removeUser, addFile, removeFile, searchFile } =
  userSlice.actions;

export default userSlice;
