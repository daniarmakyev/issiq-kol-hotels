import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createUser = createAsyncThunk(
    "users/createUser",
    async (user) => {
        const { data } = await axios.post(`http://localhost:3001/users`, user);
        return data;
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async (id: number | string) => {
        const { data } = await axios.get(`http://localhost:3001/users?id=${id}`);
        return data[0];
    }
);


export const login = createAsyncThunk(
    "users/login",
    async ({ email, password }: { email: string, password: string }) => {
        const { data } = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);

        return data[0];
    }
);
export const addFavorite = createAsyncThunk(
    "users/addFavorite",
    async ({ id, data }: { id: number | string; data: { favorites: number[] } }) => {

        const { data: updatedUser } = await axios.patch(`http://localhost:3001/users/${id}`, data);
        console.log(updatedUser);

        return updatedUser;
    }
);
