"use client"
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { House } from './house.slice';


export const getHouses = createAsyncThunk("houses/getHouses", async () => {
    const {data} = await axios.get("http://localhost:3001/houses");
    return data;
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
