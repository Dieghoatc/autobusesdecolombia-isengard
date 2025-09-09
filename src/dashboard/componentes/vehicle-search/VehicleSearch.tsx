import { useState } from "react";
import axios from "axios";
import { useVehicleStore } from "@/lib/store/useVehicleStore";

import styles from "./VehicleSearch.module.css";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.VITE_APP_PUBLIC_API_URL_DEV || import.meta.env.VITE_APP_PUBLIC_API_URL_LOCAL;

export function VehicleSearch() {
  const { setVehicleResponse, setError, setIsLoading } = useVehicleStore();
  const [plate, setPlate] = useState("");
  const [serial, setSerial] = useState("");


  async function searchVehicle(searchType: string, searchValue: string) {
    if(!searchValue.trim()){
      setError("Debe ingresar un valor");
      return;
    } 
       
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = searchType === 'plate' ? 'plate': 'serial';
      const response = await axios.get(`${API_URL}/vehicle/${endpoint}/${searchValue}`);
      setVehicleResponse(response.data);
    } catch (error) {
      console.error(error);
      setError("Error al buscar por placa");
    } finally {
      setIsLoading(false);
    }
  }

  const handlePlateSearch = () => searchVehicle('plate', plate);
  const handleSerialSearch = () => searchVehicle('serial', serial);

  return (
    <section className={styles.container}>
      <h2>Buscar Imagen</h2>

      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Buscar por placa de vehículo"
          onChange={(e) => setPlate(e.target.value)}
        />
        <div onClick={handlePlateSearch}>
          Buscar
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Buscar Serial"
          onChange={(e) => setSerial(e.target.value)}
        />
        <div onClick={handleSerialSearch} >
          Buscar
        </div>
      </div>
    </section>
  );
}
