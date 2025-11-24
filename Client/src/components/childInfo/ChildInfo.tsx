import React, { useState } from "react";
import type { childDetails } from "../../types/childDetails";
import { ActivityList } from "../activityList/ActivityList";

// ---------------------------------------------
// ACTIVIDADES MOCK (simulan tabla ActivityInterface)
// ---------------------------------------------
const mockActivities = [
  "Fisioterapia",
  "Musicoterapia",
  "Estimulación multisensorial",
  "Comunicación y lenguaje",
  "Posturas y movilidad",
  "Juego terapéutico",
  "Intervención transdisciplinar",
  "Psicomotricidad",
  "Hidroterapia",
  "Atención precoz",
].map((name, index) => ({
  id: index + 1,
  name,
}));

// ---------------------------------------------
// ICONO
// ---------------------------------------------
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
  role?: "profesor" | "familia";
}

// ---------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------
export const ChildInfo: React.FC<ChildInfoProps> = ({
  childrenData,
  selectedId,
  role = "profesor",
}) => {
  const child = childrenData.find((c) => c.id === selectedId);

  // --------------------------
  // ESTADOS INICIALES
  // --------------------------
  const [assignedActivities, setAssignedActivities] = useState([
    mockActivities[0], // Fisioterapia
    mockActivities[3], // Comunicación y lenguaje
  ]);

  const [availableActivities, setAvailableActivities] = useState(
    mockActivities.filter(
      (a) => !assignedActivities.some((as) => as.id === a.id)
    )
  );

  // Mostrar / ocultar disponibles
  const [showAvailable, setShowAvailable] = useState(false);

  // --------------------------
  // AÑADIR ACTIVIDAD
  // --------------------------
  const handleAddActivity = (id: number) => {
    const activity = availableActivities.find((a) => a.id === id);
    if (!activity) return;

    setAssignedActivities([...assignedActivities, activity]);
    setAvailableActivities(availableActivities.filter((a) => a.id !== id));
  };

  // --------------------------
  // ELIMINAR ACTIVIDAD
  // --------------------------
  const handleRemoveActivity = (id: number) => {
    const activity = assignedActivities.find((a) => a.id === id);
    if (!activity) return;

    setAssignedActivities(assignedActivities.filter((a) => a.id !== id));
    setAvailableActivities([...availableActivities, activity]);
  };

  // --------------------------
  // RENDER
  // --------------------------
  if (!child) {
    return (
      <div className="p-6 text-gray-500 font-nexe">
        Selecciona un niño para ver los detalles
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-sm border font-nexe">
      {/* INFO DEL NIÑO */}
      <div className="flex items-center gap-6 mb-6">
        <UserIcon />
        <div>
          <h2 className="text-xl font-bold text-[#003A5E]">
            {child.firstName} {child.lastName}
          </h2>
          <p className="text-gray-600 text-sm">
            Fecha de nacimiento:{" "}
            {child.birthDate
              ? new Date(child.birthDate).toLocaleDateString()
              : "Desconocida"}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold text-[#003A5E]">ID:</span> {child.id}
        </p>
        <p>
          <span className="font-semibold text-[#003A5E]">Tutor ID:</span>{" "}
          {child.tutorId}
        </p>
      </div>

      {/* ACTIVIDADES ASIGNADAS (solo lectura para familia) */}
      <ActivityList
        activities={assignedActivities}
        title="Actividades asignadas"
        showRemoveButton={role === "profesor"}
        onRemove={role === "profesor" ? handleRemoveActivity : undefined}
      />

      {/* Solo el profesor puede añadir actividades */}
      {role === "profesor" && <>
        <button
          className="mt-4 mb-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#003A5E] text-white rounded-lg hover:bg-[#004a7a]"
          onClick={() => setShowAvailable(!showAvailable)}
        >
          {showAvailable ? "–" : "+"} Actividades disponibles
        </button>
        {showAvailable && (
          <ActivityList
            activities={availableActivities}
            showAddButton
            onAdd={handleAddActivity}
          />
        )}
      </>}
    </div>
  );
};
