import { useState, useEffect } from "react";
import { PhotohraphersQuery } from "@/services/photographer.query";
import type { PhotograperResponse } from "@/services/types/photograper-response";

export function useGetPhotographers(){
    const [photographers, setPhotographers] = useState<PhotograperResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPhotographers = PhotohraphersQuery();
        setLoading(true);
        getPhotographers.then((data) => {
            setPhotographers(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        photographers,
        loading,
        error
    }
}
