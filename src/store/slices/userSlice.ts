import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type File = {
  folder: string;
  fullPath: string;
  id: number;
  isHiden: boolean;
  name: string;
  ownerEmail: string;
  path: string;
  usersEmail: string[];
};

type UserState = {
  email: string;
  token: string;
  uid: string;
  files: File[];
  isLoggedIn: boolean;
  name?: string;
  folders: string[];
};

type SetUserAction = {
  email: string;
  accessToken: string;
  uid: string;
  files: File[];
  isLoggedIn: boolean;
  name: string;
  folders: string[];
};

const initialState: UserState = {
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
    setUser(state, action: PayloadAction<SetUserAction>) {
      state.email = action.payload.email.toLowerCase();
      state.name = action.payload.name;
      state.token = action.payload.accessToken;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
      state.folders = action.payload.folders;
    },

    addFolder(state, action: PayloadAction<{folder: string}>) {
      state.folders.push(action.payload.folder);
    },

    removeFolder(state, actions: PayloadAction<{folder: string}>) {
      state.folders = state.folders.filter(
        (folder) => folder !== actions.payload.folder
      );
    },

    changeFileFolder(state, actions: PayloadAction<{fileID: number, folder: string}>) {
      for (let file of state.files)
        if (file.id === actions.payload.fileID) {
          file.folder = actions.payload.folder;
          break;
        }
    },

    setUserName(state, action: PayloadAction<{name: string}>) {
      state.name = action.payload.name;
    },

    setFiles(state, action: PayloadAction<{files: File[]}>) {
      state.files = action.payload.files;
    },

    addFile(state, action: PayloadAction<File>) {
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

    addUserOnFile(state, action: PayloadAction<{fileId: number, userEmail: string}>) {
      for (let file of state.files) {
        if (file.id === action.payload.fileId) {
          file.usersEmail.push(action.payload.userEmail.toLowerCase());
          break;
        }
      }
    },

    removeUserOnFile(state, action: PayloadAction<{fileId: number, userEmail: string}>) {
      let file: File;
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
  removeFolder,
  changeFileFolder,
} = userSlice.actions;

export default userSlice;
