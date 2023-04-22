import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: undefined,
  token: null,
  uid: null,
  isLoggedIn: false,
  files: [],
  folders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email.toLowerCase();
      state.name = action.payload.name;
      state.token = action.payload.accessToken;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
      state.folders = action.payload.folders;
    },

    addFolder(state, action) {
      state.folders.push(action.payload.folder);
    },

    removeFolder(state, actions) {
      state.folders = state.folders.filter((folder) => folder !== actions.payload.folder);
    },

    setUserName(state, action) {
      state.name = action.payload.name;
     },
    
    setFiles(state, action) {
      state.files = action.payload.files;
    },

    addFile(state, action) {
      state.files.push(action.payload);
    },

    removeFile(state, action) {
      state.files = state.files.filter(
        (file) => file.fullPath !== action.payload.path
      );
    },

    searchFile(state, action) {
      for (let file of state.files)
        if (
          !file.name.toLowerCase().includes(action.payload.text.toLowerCase())
        )
          file.isHiden = true;
        else file.isHiden = false;
    },

    addUserOnFile(state, action) {
      for (let file of state.files) {
        if (file.id === action.payload.fileId) {
          file.usersEmail.push(action.payload.userEmail.toLowerCase());
          break;
        }
      }
    },

    removeUserOnFile(state, action) {
      for (let file of state.files) {
        if (file.id === action.payload.fileId) {
          file.usersEmail = file.usersEmail.filter(
            (user) => user !== action.payload.userEmail
          );
          break;
        }
      }
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
      state.files = [];
    },
  },
});

export const {
  setUser,
  setFiles,
  removeUser,
  addFile,
  removeFile,
  searchFile,
  addUserOnFile,
  removeUserOnFile,
  setUserName,
  addFolder,
  removeFolder,
} = userSlice.actions;

export default userSlice;
