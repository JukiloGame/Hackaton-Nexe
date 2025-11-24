
import React from "react";
import type { childDetails } from "../../types/childDetails";

const UserIcon = () => (
  <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300">
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

interface ChildInfoProps {
  childrenData: childDetails[];
  selectedId: number | null;
}

export const ChildInfo: React.FC<ChildInfoProps> = ({
  childrenData,
  selectedId,
}) => {
  const child = childrenData.find((c) => c.id === selectedId);

  if (!child) {
    return (
      <div className="p-6 text-gray-500 font-nexe">
        Selecciona un niño para ver los detalles
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-sm border font-nexe">
      <div className="flex items-center gap-6 mb-6">
        <UserIcon />
        <div>
          {/* Nombre y apellidos */}
          <h2 className="text-xl font-bold text-[#003A5E]">
            {child.firstName} {child.lastName}
          </h2>
          {/* Fecha de nacimiento */}
          <p className="text-gray-600 text-sm">
            Fecha de nacimiento:{" "}
            {child.birthDate
              ? new Date(child.birthDate).toLocaleDateString()
              : "Desconocida"}
          </p>
        </div>
      </div>

      {/* ID y Tutor ID */}
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold text-[#003A5E]">ID:</span> {child.id}
        </p>
        <p>
          <span className="font-semibold text-[#003A5E]">Tutor ID:</span>{" "}
          {child.tutorId}
        </p>
      </div>
    </div>
  );
};
