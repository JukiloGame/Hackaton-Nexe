import React, { useState } from "react";

export interface Comment {
  id: number;
  text: string;
  date: string;
}

interface CommentsProps {
  childId: number;
  activityId: number;
  comments: Comment[];
  onAddComment: (childId: number, text: string) => void;
  onDeleteComment: (childId: number, commentId: number) => void;
}

export default function Comments({
  childId,
  activityId,
  comments,
  onAddComment,
  onDeleteComment,
}: CommentsProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAddComment(childId, input);
    setInput("");
  };

  return (
    <div className="w-full mt-6 p-4 bg-gray-50 border rounded-xl">
      <h3 className="text-lg font-bold text-[#003A5E] mb-3">
        Comentarios sobre la actividad
      </h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#003A5E] text-white rounded-lg hover:bg-[#004a7a]"
        >
          Añadir
        </button>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500">Aún no hay comentarios.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-white border rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="text-gray-800">{c.text}</p>
                <p className="text-xs text-gray-500 mt-1">{c.date}</p>
              </div>

              {/* Botón eliminar */}
              <button
                onClick={() => onDeleteComment(childId, c.id)}
                className="ml-4 text-red-500 hover:text-red-700 text-sm"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
