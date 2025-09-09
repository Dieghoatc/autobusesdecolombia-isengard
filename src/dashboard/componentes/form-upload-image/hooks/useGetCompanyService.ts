import { CompanyServiceQuery } from "@/services/company-service.query";
import type { CompanyServiceResponse } from "@/services/types/company-service-response";
import { useState, useEffect } from "react";


export function useGetCompanyService(){
    const [companyService, setCompanyService] = useState<CompanyServiceResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const response = CompanyServiceQuery();
        setLoading(true);
        response.then((data: CompanyServiceResponse[]) => {
            setCompanyService(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        companyService,
        loading,
        error
    }
}
