import type { TransportCategoriesResponse } from "./types/transport-categories-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData():Promise<TransportCategoriesResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/transport-categories`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function TransportCategoriesQuery(): Promise<TransportCategoriesResponse[]>{
    const data = fetchData();
    return data;
}
