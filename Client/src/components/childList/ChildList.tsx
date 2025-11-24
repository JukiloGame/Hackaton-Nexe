
import React from "react";
import type { childDetails } from "../../types/childDetails";

interface ChildListProps {
  childrenList: childDetails[];
  selectedChildId: number | null;
  onSelectChild: (child: childDetails) => void;
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

export const ChildList: React.FC<ChildListProps> = ({
  childrenList,
  selectedChildId,
  onSelectChild,
}) => {
  return (
    <div className="w-64 border-r border-gray-300">
      <h3 className="text-lg font-semibold mb-4">Buscar niño...</h3>
      <div className="space-y-2">
        {childrenList.map((child) => (
          <div
            key={child.id}
            onClick={() => onSelectChild(child)}
            className={`flex items-center gap-3 p-2 cursor-pointer rounded-md ${
              selectedChildId === child.id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            {/* Imagen o ícono */}
            {child.imageUrl ? (
              <img
                src={child.imageUrl}
                alt={`${child.nombre} ${child.apellido}`}
                className="h-14 w-14 rounded-lg object-cover border"
              />
            ) : (
              <UserIcon />
            )}
            <span className="font-medium">
              {child.nombre} {child.apellido}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
