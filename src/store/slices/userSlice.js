import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  files: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.accessToken;
      state.id = action.payload.uid;
      state.files = action.payload.files;
    },

    setFiles(state, action) {
      state.files = action.payload.files;
    },

    addFile(state, action) {
      state.files.push(action.payload);
    },
    
    removeFile(state, action) {},

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.files = [];
    },
  },
});

export const { setUser, removeUser, setFiles, addFile, removeFile } = userSlice.actions;

export default userSlice;
