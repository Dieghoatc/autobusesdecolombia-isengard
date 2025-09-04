import { useState } from "react";
import axios from "axios";

import styles from "./Form.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = process.env.API_URL_DEV;

export function FormImage() {

    const [placa, setPlaca] = useState('');
    const [serial, setSerial] = useState('');

    function getPlaca() {
        const response = axios.get(`${API_URL}/api/v1/vehicles/${placa}`)
        console.log(response)
    }

    function getSerial() {
        const response = axios.get(`${API_URL}/api/v1/vehicles/${serial}`)
        console.log(response)
    }



  return (
    <section className={styles.container}>
      <h2>Buscar Imagen</h2>
      <div className="flex gap-2 mt-2">
        <Input placeholder="Buscar por placa de vehiculo" onChange={(e) => setPlaca(e.target.value)} />
        <Button onClick={getPlaca}>Buscar</Button>
      </div>
      <div className="flex gap-2 mt-2">
        <Input placeholder="Buscar Serial" onChange={(e) => setSerial(e.target.value)} />
        <Button onClick={getSerial}>Buscar</Button>
      </div>
    </section>
  );
}
