import { useVehicleStore } from "@/lib/store/useVehicleStore";
import styles from "./SearchResult.module.css";

export function SearchResult() {
  const { vehicleResponse, isLoading } = useVehicleStore();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <section className={styles.container}>
      {vehicleResponse.data.map((vehicle) => (
        <div key={vehicle.vehicle_id}>
          <p>{vehicle.model.model_name}</p>
          <div className={styles.image_list}>
            {vehicle.vehiclePhotos.map((photo) => (
              <div key={photo.vehicle_photo_id}>
                <img src={photo.image_url} alt="" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
