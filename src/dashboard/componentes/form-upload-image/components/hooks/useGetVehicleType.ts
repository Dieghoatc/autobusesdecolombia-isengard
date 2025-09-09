import { useState, useEffect } from "react";
import { VehicleTypeService } from "@/services/vechicle-type.query";
import type { VehicleTypeResponse } from "@/services/types/vehicle-type-response";

export function useGetVehicleType(){
    const [vehicleType, setVehicleType] = useState<VehicleTypeResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVehicleType = VehicleTypeService();
        setLoading(true);
        getVehicleType.then((data) => {
            setVehicleType(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        vehicleType,
        loading,
        error
    }
}
