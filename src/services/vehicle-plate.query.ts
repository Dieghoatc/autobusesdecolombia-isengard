import axios from "axios";
import type { VehiclePlateResponse } from "./types/vehicle-plate-response";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData(plate:string):Promise<VehiclePlateResponse>{
    try {
        const response = await axios.get(`${API_URL}/vehicle/plate/${plate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function searchVehicleForPlate(plate:string): Promise<VehiclePlateResponse>{
    const data = fetchData(plate);
    return data;
}
