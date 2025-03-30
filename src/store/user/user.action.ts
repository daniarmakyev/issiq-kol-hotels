import { User } from "@/helpers/types";
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

export const getOwnerById = createAsyncThunk(
    "users/getOwnerById",
    async (id: number | string) => {
        const { data } = await axios.get(`http://localhost:3001/users?id=${id}`);
        return data[0];
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, data }: { id: string | number; data: User }) => {
        const { data: updatedUser } = await axios.patch(`http://localhost:3001/users/${id}`, data);

        return updatedUser;
    }
);

export const login = createAsyncThunk(
    "users/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const emailCheck = await axios.get(`http://localhost:3001/users?email=${email}`);

            if (emailCheck.data.length === 0) {
                return rejectWithValue("EmailNotFound");
            }

            const user = emailCheck.data.find((u: User) => u.password === password);

            if (!user) {
                return rejectWithValue("IncorrectPassword");
            }

            return user;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue({
                    code: error.code,
                    message: error.message
                });
            }
            return rejectWithValue("UnknownError");
        }
    }
);

export const register = createAsyncThunk(
    "users/register",
    async (data: User, { rejectWithValue }) => {
        try {
            const emailCheck = await axios.get(`http://localhost:3001/users?email=${data.email}`);

            if (emailCheck.data.length > 0) {
                return rejectWithValue("User already exists");
            }

            const newUser = await axios.post(`http://localhost:3001/users`, data);
            return newUser.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Registration failed");
            }
            return rejectWithValue("Unknown error occurred");
        }
    }
);


export const addFavorite = createAsyncThunk(
    "users/addFavorite",
    async ({ id, data }: { id: number | string; data: { favorites: string[] } }) => {

        const { data: updatedUser } = await axios.patch(`http://localhost:3001/users/${id}`, data);

        return updatedUser;
    }
);
