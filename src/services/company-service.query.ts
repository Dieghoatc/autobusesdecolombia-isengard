import type{ CompanyServiceResponse } from "./types/company-service-response";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

async function fetchData(): Promise<CompanyServiceResponse[]>{
    try {
        const response = await axios.get(`${API_URL}/company/service`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function CompanyServiceQuery(): Promise<CompanyServiceResponse[]>{
    const data = fetchData();
    return data;
}