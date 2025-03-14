"use client"
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { House } from './house.slice';


export const getHouses = createAsyncThunk("houses/getHouses", async ({ page, item, low }: { page: number | string; item: string | null; low: string | null }) => {
    const { data } = await axios.get(`http://localhost:3001/houses?_page=${page}&_per_page=9&_sort=${item ?? "price"}&_order=${low || "desc"}`);
    if (low == "desc") {
         console.log(data.data.reverse());
         return data 
    } else {
        return data;
    }

});
export const getHousesById = createAsyncThunk(
    "houses/getHousesById",
    async (id: number | string) => {
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
