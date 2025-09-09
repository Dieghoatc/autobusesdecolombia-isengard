import { useState, useEffect } from "react";
import { TransportCategoriesQuery } from "@/services/transport-category.query";
import type { TransportCategoriesResponse } from "@/services/types/transport-categories-response";

export function useGetTransportCategories(){
    const [transportCategory, setTransportCategory] = useState<TransportCategoriesResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransportCategory = TransportCategoriesQuery();
        setLoading(true);
        getTransportCategory.then((data) => {
            setTransportCategory(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        transportCategory,
        loading,
        error
    }
}
