import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar Niño...",
}: SearchBarProps) {
  return (
    <div className="flex items-center bg-orange-500 rounded-full px-4 py-2 w-72 shadow-md mt-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent placeholder-white text-white w-full outline-none"
      />
    </div>
  );
}
