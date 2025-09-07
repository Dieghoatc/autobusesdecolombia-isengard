import type{ PhotograperResponse } from "./types/photograper-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData(): Promise<PhotograperResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/photographer`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function PhotohraphersQuery(): Promise<PhotograperResponse[]>{
    const data = fetchData();
    return data;
}