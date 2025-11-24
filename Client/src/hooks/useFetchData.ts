import { useEffect, useState } from "react"
import { childApiInstance } from "../api/childApiInterface";

export const useFetchData = <T>(url:string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await childApiInstance.get(url);
        setData(response.data);
      } catch (error) {
        setError("An error hapenned");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()

  }, [url]);

  return {data, isLoading, error};
}