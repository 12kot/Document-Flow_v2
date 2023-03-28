import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
 // files: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      // state.files = action.payload.files;
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
     // state.files = [];
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice;
