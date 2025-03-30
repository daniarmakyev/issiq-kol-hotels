import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, getOwnerById, getUserById, login, updateUser } from "./user.action";
import { UserRespons } from "@/helpers/types";

const INIT_STATE: UserRespons = {
    user: null,
    owner:null
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
        }).addCase(getOwnerById.fulfilled, (state, { payload }) => {
            state.owner = payload
        })
    },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;