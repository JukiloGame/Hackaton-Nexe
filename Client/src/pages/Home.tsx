import { useFetchData } from "../hooks/useFetchData";
import { ChildList } from "../components/childList/ChildList";
import type { childDetails } from "../types/childDetails";
import SearchBar from "../components/searchBar/SearchBar";
import { useState } from "react";

export const Home = () => {
  const { data, isLoading, error } = useFetchData<childDetails[]>("/children");
  const [query, setQuery] = useState("");
  console.log(error);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10 text-gray-600 font-nexe">
        Cargando niños...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center py-10 text-red-600 font-nexe">
        Error cargando los datos
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center py-10 text-gray-600 font-nexe">
        No hay niños registrados
      </div>
    );
  }

  return (
    <div className="p-10 font-nexe">
      <h1 className="text-3xl font-bold text-[#003A5E] mb-6">
        Lista de niños (Test)
      </h1>
      <h1 className="text-3xl font-bold text-[#004B73] mb-6">
        ¡Bienvenido Profe!
      </h1>

      <div className="px-12">
        {/* El buscador va debajo del header */}
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {/* Comprobamos el componente ChildList */}
      <ChildList childrenData={data} />
    </div>
  );
};
