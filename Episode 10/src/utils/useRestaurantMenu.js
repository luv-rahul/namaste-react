import { useEffect, useState } from "react";

export const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await response.json();
      setResInfo(json);
      return resInfo;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
