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
        return data;
    }
);