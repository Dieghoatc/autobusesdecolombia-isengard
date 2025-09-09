import { useState, useMemo } from "react";

import { searchVehicleForPlate } from "@/services/vehicle-plate.query";

import { useGetVehicleType } from "./hooks/useGetVehicleType";
import { useGetVehicleModel } from "./hooks/useGetVehicleModel";
import { useGetCompany } from "./hooks/useGetCompany";
import { useGetTransportCategories } from "./hooks/useGetTransportCategories";
import { useGetCompanyService } from "./hooks/useGetCompanyService";

import { useVehicleStore } from "@/lib/store/useVehicleStore";
import { uploadImageMutation } from "@/services/uploadImage.mutation";

import type { Vehicle } from "@/services/types/vehicle-plate-response";
import { setBogotaCity } from "@/lib/helpers/setBogota";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkPhoto } from "./components/mark-photo";

import { ComboBox } from "@/components/combobox";

import styles from "./FormUploadImage.module.css";

const formSchema = z.object({
  plate: z.string().optional(),
  serial: z.string().optional(),
});

export function FormUploadImage() {
  const { vehicleType, loading: vehicleTypeLoading } = useGetVehicleType();
  const { vehicleModels, loading: vehicleModelsLoading } = useGetVehicleModel();
  const { company, loading: companyLoading } = useGetCompany();
  const { transportCategory, loading: transportCategoryLoading } =
    useGetTransportCategories();
  const { companyService, loading: companyServiceLoading } =
    useGetCompanyService();

  const [selectedVehicleType, setSelectedVehicleType] = useState({
    id: "",
    name: "",
  });
  const [selectedVehicleModel, setSelectedVehicleModel] = useState({
    id: "",
    name: "",
  });
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    name: "",
  });
  const [selectedTransportCategory, setSelectedTransportCategory] = useState({
    id: "",
    name: "",
  });

  const [selectedCompanyService, setSelectedCompanyService] = useState({
    id: "",
    name: "",
  });

  const [vehicle, setVehicle] = useState<Vehicle>();
  const { buffer, authorStore, cityStore } = useVehicleStore();

  const [submitMessage, setSubmitMessage] = useState("");

  const vehicleTypeList = useMemo(() => {
    return vehicleType.map((vehicleType) => ({
      value: vehicleType.name,
      label: vehicleType.name,
      id: vehicleType.vehicle_type_id,
    }));
  }, [vehicleType]);

  const vehicleModelList = useMemo(() => {
    return vehicleModels.map((vehicleModel) => ({
      value: vehicleModel.model_name,
      label: vehicleModel.model_name,
      id: vehicleModel.model_id,
    }));
  }, [vehicleModels]);

  const companyList = useMemo(() => {
    return company.map((company) => ({
      value: company.company_name,
      label: company.company_name,
      id: company.company_id,
    }));
  }, [company]);

  const transportCategoryList = useMemo(() => {
    return transportCategory.map((transportCategory) => ({
      value: transportCategory.name,
      label: transportCategory.name,
      id: transportCategory.transport_category_id,
    }));
  }, [transportCategory]);

  const companyServiceList = useMemo(() => {
    return companyService.map((companyService) => ({
      value: companyService.company_service_name,
      label: companyService.company_service_name,
      id: companyService.company_service_id,
    }));
  }, [companyService]);

  const searchVehicleType = vehicleType.find(
    (vehicleType) => vehicleType.vehicle_type_id === vehicle?.vehicle_type_id
  );
  const transportCategorySearch = transportCategory.find(
    (transportCategory) =>
      transportCategory.transport_category_id === vehicle?.transport_category_id
  );
  const companySearch = company.find(
    (company) => company.company_id === vehicle?.company_id
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: "",
      serial: "",
    },
  });

  async function handleSearchVehicle(value?: string) {
    const response = await searchVehicleForPlate(value || "");
    setVehicle(response.data[0]);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitMessage("Subiendo imagen...");

    try {
      const formData = new FormData();

      if (buffer) {
        const blob = new Blob([buffer], { type: "image/avif" });
        formData.append("photo", blob, "image.avif");
      } else {
        throw new Error("No image data available");
      }

      if (vehicle) {
        formData.append("vehicle_id", vehicle.vehicle_id.toString() || "");
      }
      formData.append("photographer_id", authorStore.id.toString());
      formData.append("location", setBogotaCity(cityStore.name));

      if (!vehicle) {
        formData.append("plate", values.plate || "");
        formData.append("company_serial", values.serial?.toString() || "");
        formData.append("vehicle_type_id", selectedVehicleType.id.toString());
        formData.append("model_id", selectedVehicleModel.id.toString());
        formData.append("company_id", selectedCompany.id.toString());
        formData.append(
          "transport_category_id",
          selectedTransportCategory.id.toString()
        );
        if (selectedCompanyService.id) {
          formData.append(
            "company_service_id",
            selectedCompanyService.id.toString()
          );
        }
      }

      await uploadImageMutation(formData);
      setSubmitMessage("Imagen subida exitosamente");

      form.reset();
    } catch (error) {
      console.error("Error al marcar la foto:", error);
      setSubmitMessage("Error al marcar la foto. Intenta nuevamente.");
    }

    form.reset();
  }

  if (
    vehicleTypeLoading ||
    vehicleModelsLoading ||
    companyLoading ||
    transportCategoryLoading ||
    companyServiceLoading
  ) {
    return <p>Cargando...</p>;
  }

  return (
    <section className={styles.container}>
      <MarkPhoto />
      <div className={styles.form}>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-4"
            >
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa del vehículo</FormLabel>
                    <FormControl>
                      <Input placeholder="XJS 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => handleSearchVehicle(form.getValues("plate"))}
              >
                Buscar
              </Button>
              <FormField
                control={form.control}
                name="serial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial del vehiculo</FormLabel>
                    <FormControl>
                      <Input placeholder="098726" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Subir Imagen</Button>
            </form>
          </Form>
        </div>
        <section>
          {vehicle ? (
            <div className={styles.preview_info}>
              <h2>Información del vehículo</h2>
              <article className={styles.preview_info_items}>
                <div>
                  <h3>Tipo de vehículo</h3>
                  {searchVehicleType && <span>{searchVehicleType.name}</span>}
                </div>
                <div>
                  <h3>Modelo del vehículo</h3>
                  <span>{vehicle.model.model_name}</span>
                </div>
                <div>
                  <h3>Categoria Transporte</h3>
                  {transportCategorySearch && (
                    <span>{transportCategorySearch.name}</span>
                  )}
                </div>
                <div>
                  <h3>Compañía</h3>
                  {companySearch && <span>{companySearch.company_name}</span>}
                </div>
              </article>
            </div>
          ) : (
            <div className={styles.vehicle_upload_form}>
              <div>
                <ComboBox
                  value={selectedVehicleType}
                  setValue={setSelectedVehicleType}
                  list={vehicleTypeList}
                  text="Tipo de vehículo"
                />
              </div>
              <div>
                <ComboBox
                  value={selectedVehicleModel}
                  setValue={setSelectedVehicleModel}
                  list={vehicleModelList}
                  text="Modelo del vehículo"
                />
              </div>
              <div>
                <ComboBox
                  value={selectedTransportCategory}
                  setValue={setSelectedTransportCategory}
                  list={transportCategoryList}
                  text="Categoria Transporte"
                />
              </div>
              <div>
                <ComboBox
                  value={selectedCompany}
                  setValue={setSelectedCompany}
                  list={companyList}
                  text="Compañía"
                />
              </div>
              <div>
                <ComboBox
                  value={selectedCompanyService}
                  setValue={setSelectedCompanyService}
                  list={companyServiceList}
                  text="Servicio"
                />
              </div>
            </div>
          )}
        </section>
      </div>
      {submitMessage && <p>{submitMessage}</p>}
    </section>
  );
}
