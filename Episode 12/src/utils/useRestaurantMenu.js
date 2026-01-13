import { useEffect, useState } from "react";
import axios from "axios";

export const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/menu/${resId}`
      );
      setResInfo(response);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { resInfo, loading, error };
};
