import { useState, useEffect } from "react";
import { VehicleModelService } from "@/services/vehicle-model.query";
import type { VehicleModelResponse } from "@/services/types/vehicle-model-response";

export function useGetVehicleModel(){
    const [models, setModel] = useState<VehicleModelResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPhotographers = VehicleModelService();
        setLoading(true);
        getPhotographers.then((data) => {
            setModel(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        models,
        loading,
        error
    }
}
