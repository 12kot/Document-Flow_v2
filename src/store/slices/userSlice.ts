import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFile, User } from "../../Types/Types";

const initialState: User = {
  email: "",
  name: "",
  token: "",
  uid: "",
  isLoggedIn: false,
  files: [],
  folders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email.toLowerCase();
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
      state.folders = action.payload.folders;
    },

    addFolder(state, action: PayloadAction<{folder: string}>) {
      state.folders.push(action.payload.folder);
    },

    setFolders(state, actions: PayloadAction<{ folders: string[] }>) {
      state.folders = actions.payload.folders;
    },

    changeFileFolder(state, actions: PayloadAction<{fileID: string, folder: string}>) {
      let file: UserFile;
      for (file of state.files)
        if (file.id === actions.payload.fileID) {
          file.folder = actions.payload.folder;
          break;
        }
    },

    setUserName(state, action: PayloadAction<{name: string}>) {
      state.name = action.payload.name;
    },

    setFiles(state, action: PayloadAction<{files: UserFile[]}>) {
      state.files = action.payload.files;
    },

    addFile(state, action: PayloadAction<UserFile>) {
      state.files.push(action.payload);
    },

    removeFile(state, action: PayloadAction<{path: string}>) {
      state.files = state.files.filter(
        (file) => file.fullPath !== action.payload.path
      );
    },

    searchFile(state, action: PayloadAction<{text: string}>) {
      for (let file of state.files)
        if (
          !file.name.toLowerCase().includes(action.payload.text.toLowerCase())
        )
          file.isHiden = true;
        else file.isHiden = false;
    },

    addUserOnFile(state, action: PayloadAction<{fileId: string, userEmail: string}>) {
      for (let file of state.files) {
        if (file.id === action.payload.fileId) {
          file.usersEmail.push(action.payload.userEmail.toLowerCase());
          break;
        }
      }
    },

    removeUserOnFile(state, action: PayloadAction<{fileId: string, userEmail: string}>) {
      let file: UserFile;
      for (file of state.files) {
        if (file.id === action.payload.fileId) {
          file.usersEmail = file.usersEmail.filter(
            (user: string) => user !== action.payload.userEmail
          );
          break;
        }
      }
    },

    removeUser(state) {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.name = "";
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
  setFolders,
  changeFileFolder,
} = userSlice.actions;

export default userSlice;
