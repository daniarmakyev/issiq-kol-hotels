"use client"
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { House } from './house.slice';


export const getHouses = createAsyncThunk("houses/getHouses", async ({ page, item, low }: { page: number | string; item: string | null; low: string | null }) => {
    const { data } = await axios.get(`http://localhost:3001/houses?_page=${page}&_per_page=9&_sort=${item ?? "rating"}&_order=${low || "desc"}`);
    if (low == "desc") {
        data.data.reverse()
        return data
    } else {
        return data;
    }

});
export const getHousesById = createAsyncThunk(
    "houses/getHousesById",
    async (id: number | string | number[]) => {
        const { data } = await axios.get(`http://localhost:3001/houses?id=${id}`);
        return data;
    }
);

export const getSpecialHouses = createAsyncThunk("houses/getSpecialHouses", async () => {
    const { data } = await axios.get("http://localhost:3001/houses");

    const filteredHouses = data.filter((house: House) => house.rating.valueOf() >= 4);

    const sortedHouses = filteredHouses.sort((a: House, b: House) => {
        const servicesCountDifference = Number(b.services_count) - Number(a.services_count);
        if (servicesCountDifference !== 0) {
            return servicesCountDifference;
        }
        return Number(b.amenities_count) - Number(a.amenities_count);
    });

    return sortedHouses.slice(0, 3);
});


export const getUserRentedHouses = createAsyncThunk(
    "house/getUserRentedHouses",
    async (rentedIds: { rented: number[], rentedBef: number[] }) => {

        const rentedRequests = rentedIds.rented.map(id => 
            axios.get(`http://localhost:3001/houses/${id}`)
        );

        const rentedBefRequests = rentedIds.rentedBef.map(id => 
            axios.get(`http://localhost:3001/houses/${id}`)
        );

   
        const [rentedResponses, rentedBefResponses] = await Promise.all([
            Promise.all(rentedRequests),
            Promise.all(rentedBefRequests)
        ]);

        return {
            rented: rentedResponses.map(response => response.data),
            rentedBef: rentedBefResponses.map(response => response.data)
        };
    }
);