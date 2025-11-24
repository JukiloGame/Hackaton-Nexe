import { useState } from "react";
import { childApiInstance } from "../api/childApiInterface";
import type { CommentsType } from "../types/CommentsType";

const URL = "/comments";

export const useAddActivity = () => {
  const [error, setError] = useState<string | null>(null);

  const addComment = async (comment: CommentsType) => {
    setError(null);
    try {
      await childApiInstance.post(URL, comment);
    } catch {
      setError("An error happened");
    }
  };

  return { addComment, error };
}