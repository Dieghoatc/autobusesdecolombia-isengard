import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/combobox";

import { cities } from "@/lib/constants/cities";
import { useGetPhotographers } from "../../../../hooks/useGetPhotographers";

interface Author {
    id: string;
    name: string;
}

interface City {
    id: string;
    name: string;
}

interface ComboboxListProps {
    author: Author;
    setAuthor: (author: Author) => void;
    city: City;
    setCity: (city: City) => void;    
}

export function ComoboBoxList({ author, setAuthor, city, setCity }: ComboboxListProps) {
  const { photographers, loading } = useGetPhotographers()
    useGetPhotographers();

  const photographersList = useMemo(() => {
    return photographers.map((photographer) => ({
      value: photographer.name,
      label: photographer.name,
      id: photographer.photographer_id,
    }));
  }, [photographers]);

  const citiesList = useMemo(() => {
    return cities.map((city, _index) => ({
      value: `${city.city} - ${city.department}`,
      label: `${city.city} - ${city.department}`,
      id: _index
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
        <ComboBox
          value={author}
          setValue={setAuthor}
          list={photographersList}
          text="Fotografo/a"
        />
      </div>
      <div>
        <Label className="mb-2">Ciudad</Label>
        <ComboBox
          value={city}
          setValue={setCity}
          list={citiesList}
          text="Ciudad"
        />
      </div>
    </section>
  );
}
