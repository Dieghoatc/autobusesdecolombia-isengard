import { useState, useEffect } from "react";
import { searchVehicleForPlate } from "@/services/vehicle-plate.query";
import type { Vehicle } from "@/services/types/vehicle-plate-response";

export function useGetVehicleForPlate(plate: string){
    const [vehicle, setVehicle] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const response = searchVehicleForPlate(plate);
        setLoading(true);
        response.then((data) => {
            setVehicle(data.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [plate]);

    return {
        vehicle,
        loading,
        error
    }
}
