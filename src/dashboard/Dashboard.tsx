import { VehicleSearch } from "./componentes/vehicle-search";
import { Navbar } from "./componentes/navbar";
import { SearchResult } from "./componentes/search-result";
import { FormUploadImage } from "./componentes/form-upload-image";

import styles from "./Dashboard.module.css";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.searchPhoto}>
          <VehicleSearch />
          <SearchResult />
        </div>
        <div>
          <FormUploadImage />
        </div>
      </main>
    </>
  );
}
