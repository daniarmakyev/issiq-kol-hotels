"use client"
import { createSlice } from "@reduxjs/toolkit";
import { getAllHouses, getCreated, getFav, getHouses, getHousesById, getSpecialHouses, getUserRentedHouses } from "./house.action";
import { HousesResponse } from "@/helpers/types";


const INIT_STATE: HousesResponse = {
    houses: null,
    special: [],
    house: [],
    created: [],
    favorites: [],
    userRented: {
        rented: [],
        rentedBef: []
    },
    all:[]
};

export const houseSlice = createSlice({
    name: "houses",
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHouses.fulfilled, (state, { payload }) => {
                state.houses = payload;
            })
            .addCase(getSpecialHouses.fulfilled, (state, { payload }) => {
                state.special = payload;
            })
            .addCase(getHousesById.fulfilled, (state, { payload }) => {
                state.house = payload;
            })
            .addCase(getUserRentedHouses.fulfilled, (state, { payload }) => {
                state.userRented.rented = payload.rented;
                state.userRented.rentedBef = payload.rentedBef;
            }).addCase(getCreated.fulfilled, (state, { payload }) => {
                state.created = payload;
            }).addCase(getFav.fulfilled, (state, { payload }) => {
                const newHouses = payload.filter(newHouse =>
                    !state.favorites.some(existing => existing.id === newHouse.id)
                );
                state.favorites.push(...newHouses);
            }).addCase(getAllHouses.fulfilled, (state, { payload }) => {
                state.all = payload;
            })
    },
});

export default houseSlice.reducer;