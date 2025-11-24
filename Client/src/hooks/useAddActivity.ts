import { useState } from "react";
import { childApiInstance } from "../api/childApiInterface";
import type { ActivityInstanceType } from "../types/ActivityInstance";

const URL = "/activity-instance";

export const useAddActivity = () => {
  const [error, setError] = useState<string | null>(null);

  const addActivity = async (activityInstance: ActivityInstanceType) => {
    setError(null);
    try {
      await childApiInstance.post(URL, activityInstance);
    } catch {
      setError("An error happened");
    }
  };

  return { addActivity, error };
}