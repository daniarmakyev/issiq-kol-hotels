import axios from 'axios';
import { HousesResponse } from './house.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getHouses = createAsyncThunk("houses/getHouses", async () => {
    const {data} = await axios.get("http://localhost:3001/houses");
    return data;
});

export const getSpecialHouses = createAsyncThunk("houses/getSpecialHouses", async () => {
    const { data } = await axios.get("http://localhost:3001/houses");

    const filteredHouses = data.filter((house: any) => house.rating >= 4);

    const sortedHouses = filteredHouses.sort((a: any, b: any) => {
        const servicesCountDifference = b.services_count - a.services_count;
        if (servicesCountDifference !== 0) {
            return servicesCountDifference;
        }
        return b.amenities_count - a.amenities_count; 
    });

    return sortedHouses.slice(0, 3);
});
