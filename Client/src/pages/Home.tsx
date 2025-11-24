import React, { useState } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import Header from "../components/header/Header";   
    
export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center mt-10">
         {/* Contenido de la página */}
        <h1 className="text-3xl font-bold text-[#004B73] mb-6">
         ¡Bienvenido Profe!
        </h1>

      <div className="px-12">
        {/* El buscador va debajo del header */}
        <SearchBar value={query} onChange={setQuery} />

       
      </div>
    </div>
  );
}
