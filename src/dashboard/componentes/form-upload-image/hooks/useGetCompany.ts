import { useState, useEffect } from "react";
import { CompanyQuery } from "@/services/company.query";
import type { CompanyResponse } from "@/services/types/company-response";

export function useGetCompany(){
    const [company, setCompany] = useState<CompanyResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCompanies = CompanyQuery();
        setLoading(true);
        getCompanies.then((data) => {
            setCompany(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        company,
        loading,
        error
    }
}
