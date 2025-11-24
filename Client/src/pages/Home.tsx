
import { useFetchData } from "../hooks/useFetchData";
import { ChildList } from "../components/childList/ChildList";
import { ChildInfo } from "../components/childInfo/ChildInfo";
import type { childDetails } from "../types/childDetails";
import SearchBar from "../components/searchBar/SearchBar";
import { useState } from "react";

export const Home = () => {
  const { data, isLoading, error } = useFetchData<childDetails[]>("/children");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex justify-center py-10 text-gray-600 font-nexe">
        No hay niños registrados
      </div>
    );
  }

  // ⭐ FILTRO
  const filteredChildren = data.filter((child) =>
    `${child.firstName} ${child.lastName}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="p-10 font-nexe">
      <h1 className="text-3xl font-bold text-[#004B73] mb-6">
        ¡Bienvenido Profe!
      </h1>

      <div className="px-12">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* ⭐ AQUÍ USO EL RESULTADO FILTRADO */}
      <ChildList childrenData={filteredChildren} />
    </div>
  );
};
