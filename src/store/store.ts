import { configureStore } from "@reduxjs/toolkit";
import { houseSlice } from "./house/house.slice";
import { userSlice } from "./user/user.slice";

export const store = configureStore({
    reducer: {
        houses: houseSlice.reducer,
        users: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;