"use client"
import { createSlice } from "@reduxjs/toolkit";
import { getFav, getHouses, getHousesById, getSpecialHouses, getUserRentedHouses } from "./house.action";
import { IPag } from "@/app/hotels/page";

interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}

interface LocalizedStringArray {
    en: string[];
    ru: string[];
    kg: string[];
    kz: string[];
}

interface Geo {
    latitude: number;
    longitude: number;
}

interface Contact {
    phone: string;
    email: string;
}

interface Availability {
    check_in: string;
    check_out: string;
    total_count: number;
    available_count: number;
}

interface Policies {
    pets_allowed: boolean;
    cancellation: LocalizedText;
}


// interface Owner {
//     id: number;
//     type: string;
//     name: LocalizedText;
//     phone: string;
//     email: string;
// }

export interface House {
    id: number;
    name: LocalizedText;
    location: LocalizedText;
    geo: Geo;
    price: number;
    currency: string;
    limit: number;
    beds: number;
    rooms: number;
    bathrooms: number;
    square: number;
    category: string;
    type: string;
    amenities: LocalizedStringArray;
    services: LocalizedStringArray;
    description: LocalizedText;
    contact: Contact;
    images: string[];
    availability: Availability;
    policies: Policies;
    owner: number;
    services_count: number;
    amenities_count: number;
    rating: number
}

export interface HousesResponse {
    houses: IPag | null;
    special: House[];
    house: House[],
    favorites:House[],
    userRented: {
        rentedBef: House[],
        rented: House[],
    }

}

const INIT_STATE: HousesResponse = {
    houses: null,
    special: [],
    house: [],
    favorites: [],
    userRented: {
        rented: [],
        rentedBef: []
    }
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
            })
            .addCase(getFav.fulfilled, (state, { payload }) => {
                const newHouses = payload.filter(newHouse => 
                    !state.favorites.some(existing => existing.id === newHouse.id)
                );
                state.favorites.push(...newHouses);
            });
    },
});

export default houseSlice.reducer;