import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer.reducer,
        auth: authReducer.reducer
    }
});