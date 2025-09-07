import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { ComboBoxItem } from "./ComboBoxItem";

import { cities } from "@/lib/constants/cities";
import { useGetPhotographers } from "../../../hooks/useGetPhotographers";

interface ComboboxListProps {
    author: string;
    setAuthor: (author: string) => void;
    city: string;
    setCity: (city: string) => void;
    
}


export function ComoboboxList({ author, setAuthor, city, setCity }: ComboboxListProps) {
  const { photographers, loading } = useGetPhotographers()
    useGetPhotographers();

  const photographersList = useMemo(() => {
    return photographers.map((photographer) => ({
      value: photographer.name,
      label: photographer.name,
    }));
  }, [photographers]);

  const citiesList = useMemo(() => {
    return cities.map((city) => ({
      value: `${city.city} - ${city.department}`,
      label: `${city.city} - ${city.department}`,
    }));
  }, []);

  if (loading) {
    return (
        <div>
            <div className="text-lg">Cargando fotógrafos...</div>
        </div>
    )
  }

  return (
    <section>
      <div>
        <Label className="mb-2">Fotógrafo/a</Label>
        <ComboBoxItem
          value={author}
          setValue={setAuthor}
          list={photographersList}
          text="Fotografo/a"
        />
      </div>
      <div>
        <Label className="mb-2">Ciudad</Label>
        <ComboBoxItem
          value={city}
          setValue={setCity}
          list={citiesList}
          text="Ciudad"
        />
      </div>
    </section>
  );
}
