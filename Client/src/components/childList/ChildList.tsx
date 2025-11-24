import type { childDetails } from "../../types/childDetails";

// Icono de usuario genérico
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

interface ChildListProps {
  childrenData: childDetails[];
  onSelect?: (id: number) => void;
}

export const ChildList = ({ childrenData, onSelect }: ChildListProps) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4 font-nexe">
      {childrenData.map((child) => (
        <div
          key={child.id}
          onClick={() => onSelect?.(child.id)}
          className="
            flex items-center gap-4 p-4 
            bg-white rounded-xl shadow-sm 
            border-l-4 border-[#003A5E] 
            hover:shadow-lg hover:border-[#FF7A00] 
            transition-all cursor-pointer
          "
        >
          <UserIcon />

          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#003A5E]">
              {child.firstname} {child.lastname}
            </span>

            <span className="text-sm text-gray-500">
              {child.birthdate
                ? new Date(child.birthdate).toLocaleDateString()
                : "Fecha desconocida"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
