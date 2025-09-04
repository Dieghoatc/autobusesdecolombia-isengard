import { createContext } from "react";
import styles from "./Dashboard.module.css";
import { FormImage } from "./componentes/form-image";
import { Navbar } from "./componentes/navbar";
import { PrincipalPanel } from "./componentes/principal-panel";

const PhotoContext = createContext({
  plate: "",
  serial: "",
});

export function Dashboard() {
  return (
    <PhotoContext value={{ plate: "", serial: "" }}>
      <>
        <Navbar />
        <main className={styles.main}>
          <FormImage />
          <PrincipalPanel />
        </main>
      </>
    </PhotoContext>
  );
}
