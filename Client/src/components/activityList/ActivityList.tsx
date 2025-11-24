import React from "react";

interface Activity {
  id: number;
  name: string;
}

interface ActivityListProps {
  activities: Activity[];
  title?: string;
  showAddButton?: boolean; // muestra botón añadir
  showRemoveButton?: boolean; // muestra botón eliminar
  onAdd?: (id: number) => void;
  onRemove?: (id: number) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  title,
  showAddButton = false,
  showRemoveButton = false,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="w-full mt-4">
      {title && (
        <h3 className="text-lg font-bold text-[#003A5E] mb-3">{title}</h3>
      )}

      {activities.length === 0 ? (
        <p className="text-gray-500">No hay actividades.</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 border rounded-lg mb-2"
          >
            <span>{activity.name}</span>

            <div className="flex gap-2">
              {showAddButton && onAdd && (
                <button
                  className="px-3 py-1 bg-[#003A5E] text-white rounded-md hover:bg-[#004a7a]"
                  onClick={() => onAdd(activity.id)}
                >
                  Añadir
                </button>
              )}

              {showRemoveButton && onRemove && (
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => onRemove(activity.id)}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
