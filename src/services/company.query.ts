import type{ CompanyResponse } from "./types/company-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData(): Promise<CompanyResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/company`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function CompanyQuery(): Promise<CompanyResponse[]>{
    const data = fetchData();
    return data;
}