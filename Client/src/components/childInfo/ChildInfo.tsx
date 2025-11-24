
import React, { useState, useEffect } from "react";
import type { childDetails } from "../../types/childDetails";

interface ChildInfoProps {
  childrenList: childDetails[];
}

const UserIcon = () => (
  <div className="h-14 w-14 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#003A5E"
      viewBox="0 0 24 24"
      stroke="#003A5E"
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 18a4 4 0 00-8 0M12 10a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  </div>
);

export const ChildInfo: React.FC<ChildInfoProps> = ({ childrenList }) => {
  const [selectedChild, setSelectedChild] = useState<childDetails | null>(null);

  useEffect(() => {
    if (childrenList.length > 0) {
      setSelectedChild(childrenList[0]);
    }
  }, [childrenList]);

  return (
    <div className="flex gap-6">
      {/* Lista de niños */}
      <div className="w-64 border-r border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Buscar niño...</h3>
        <div className="space-y-2">
          {childrenList.map((child) => (
            <div
              key={child.id}
              onClick={() => setSelectedChild(child)}
              className={`flex items-center gap-3 p-2 cursor-pointer rounded-md ${
                selectedChild?.id === child.id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <UserIcon />
              <span className="font-medium">
                {child.nombre} {child.apellido}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detalle del niño */}
      <div className="flex-1">
        {selectedChild ? (
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex items-center gap-4 mb-4">
              {/* Imagen del niño o ícono */}
              {selectedChild.imageUrl ? (
                <img
                  src={selectedChild.imageUrl}
                  alt={`${selectedChild.nombre} ${selectedChild.apellido}`}
                  className="h-20 w-20 rounded-lg object-cover border"
                />
              ) : (
                <UserIcon />
              )}
              <div>
                <h2 className="text-xl font-bold">
                  {selectedChild.nombre} {selectedChild.apellido}
                </h2>
                <p className="text-gray-600">ID: {selectedChild.id}</p>
              </div>
            </div>

            <p className="mb-2">
              <strong>Tutor ID:</strong> {selectedChild.tutorId}
            </p>
            <p className="mb-2">
              <strong>Fecha de nacimiento:</strong> {selectedChild.dob}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona un niño para ver los detalles</p>
        )}
      </div>
    </div>
  );
};
