import type { VehicleModelResponse } from "./types/vehicle-model-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData():Promise<VehicleModelResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/vehicle-model`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function VehicleModelService(): Promise<VehicleModelResponse[]>{
    const data = fetchData();
    return data;
}
