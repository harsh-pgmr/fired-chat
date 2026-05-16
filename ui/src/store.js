import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";


const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})


export default store;
