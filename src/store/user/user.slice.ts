import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, getUserById, login, updateUser } from "./user.action";

interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}
export interface User {
    id?: string | number;  // В JSON это строка, в интерфейсе было число
    type?: string;
    name?: LocalizedText;
    phone?: string;
    email?: string;
    password?: string;
    payment?: number;
    rented?: number[];
    rented_before?: number[];
    favorites?: number[];
    avaible_hotels?: number[];  
    disable_hotels?: number[];   
    hotels?: number[];     
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
        }).addCase(updateUser.fulfilled, (state, { payload }) => {
            state.user = payload
        })
    },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;