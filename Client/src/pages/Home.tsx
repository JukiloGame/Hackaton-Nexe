import { useFetchData } from "../hooks/useFetchData";
import { ChildList } from "../components/childList/ChildList";
import { ChildInfo } from "../components/childInfo/ChildInfo";
import type { childDetails } from "../types/childDetails";
import SearchBar from "../components/searchBar/SearchBar";
import { useState } from "react";
import Comments, { type Comment } from "../components/comments/Comments";

export const Home = () => {
  const { data, isLoading, error } = useFetchData<childDetails[]>("/children");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Role switch: 'profesor' shows all children, 'familia' shows only those with a matching tutorId
  const [role, setRole] = useState<"profesor" | "familia">("profesor");

  // Comentarios organizados por niño
  const [commentsByChild, setCommentsByChild] = useState<
    Record<number, Comment[]>
  >({});

  const handleAddComment = (childId: number, text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };

    setCommentsByChild((prev) => ({
      ...prev,
      [childId]: [...(prev[childId] || []), newComment],
    }));
  };

  // ⭐ ELIMINAR COMENTARIO
  const handleDeleteComment = (childId: number, commentId: number) => {
    setCommentsByChild((prev) => ({
      ...prev,
      [childId]: prev[childId].filter((c) => c.id !== commentId),
    }));
  };

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

  const filteredChildren = data.filter((child) =>
    `${child.firstName} ${child.lastName}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // ⭐ Filtrar por rol/tutor
  const displayedChildren = filteredChildren.filter((child) => {
    if (role === "familia") {
      return child.tutorId === 101;
    }
    return true;
  });

  return (
    <div className="p-10 font-nexe">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#004B73]">
          {role === "profesor" ? "¡Bienvenido Profe!" : "Vista de la Familia Soler"}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRole("profesor")}
            className={`px-3 py-2 rounded ${role === "profesor" ? "bg-[#003A5E] text-white" : "bg-white text-[#003A5E] border border-[#003A5E]"}`}
          >
            Profesor
          </button>
          <button
            onClick={() => setRole("familia")}
            className={`px-3 py-2 rounded ${role === "familia" ? "bg-[#004B73] text-white" : "bg-white text-[#004B73] border border-[#004B73]"}`}
          >
            Familia
          </button>
        </div>
      </div>

      <div className="px-12 mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="flex gap-8 px-12">
        <div className="flex-1 max-w-sm">
          {displayedChildren.length === 0 ? (
            <div className="text-gray-600">No hay niños para el rol/tutor seleccionado.</div>
          ) : (
            <ChildList
              childrenData={displayedChildren}
              onSelect={(id) => setSelectedId(id)}
            />
          )}
        </div>

        <div className="flex-1">
          <ChildInfo childrenData={data} selectedId={selectedId} role={role} />

          {selectedId && (
            <div className="mt-8">
              <Comments
                childId={selectedId}
                activityId={1}
                comments={commentsByChild[selectedId] || []}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                role={role}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
