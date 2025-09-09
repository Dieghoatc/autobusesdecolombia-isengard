import type { VehicleTypeResponse } from "./types/vehicle-type-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData():Promise<VehicleTypeResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/vehicle-type`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function VehicleTypeService(): Promise<VehicleTypeResponse[]>{
    const data = fetchData();
    return data;
}
