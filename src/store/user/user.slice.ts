import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./user.action";

interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}
interface User {
    id: number;
    type: string;
    name: LocalizedText;
    phone: string;
    email: string;
    favorites: number[],
    hotels: number[],
    password: string
}

interface UserRespons {
    user: User | null
}

const INIT_STATE: UserRespons = {
    user: null
};

export const houseSlice = createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, {payload}) => {
            state.user = payload
        })
    },
});

export default houseSlice.reducer;