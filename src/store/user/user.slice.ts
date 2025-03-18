import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, getUserById, login } from "./user.action";

interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}
export interface User {
    id: number;
    type: string;
    name: LocalizedText;
    phone: string;
    email: string;
    favorites: number[],
    hotels: number[],
    password: string
}

export interface UserRespons {
    user: User | null
}

const INIT_STATE: UserRespons = {
    user: null
};

export const userSlice = createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {
        logout: (user) => { localStorage.removeItem("id"); user.user = null }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, { payload }) => {
            state.user = payload
        }).addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload
        }).addCase(addFavorite.fulfilled, (state, { payload }) => {
            state.user = payload
        })
    },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;