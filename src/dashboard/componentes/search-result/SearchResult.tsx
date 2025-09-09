import { useState } from "react";
import { useVehicleStore } from "@/lib/store/useVehicleStore";
import { ModalImage } from "@/components/modal";

import styles from "./SearchResult.module.css";

export function SearchResult() {
  const { vehicleResponse, isLoading } = useVehicleStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");


  function handleOpenModal(src: string) {
    setModalOpen(true);
    setImageSrc(src);
  }

  if (isLoading) return <p>Cargando...</p>;

  return (
    <section className={styles.container}>
      {vehicleResponse.data.map((vehicle) => (
        <div key={vehicle.vehicle_id}>
          <p>{vehicle.model.model_name}</p>
          <div className={styles.image_list}>
            {vehicle.vehiclePhotos.map((photo) => (
              <div key={photo.vehicle_photo_id} onClick={() => handleOpenModal(photo.image_url)}>
                <img src={photo.image_url} alt="" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <ModalImage isOpen={modalOpen} onClose={() => setModalOpen(false)} imageSrc={imageSrc} />
    </section>
  );
}
