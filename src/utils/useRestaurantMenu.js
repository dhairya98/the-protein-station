import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9358325&lng=77.6328499&restaurantId=${resId}&catalog_qa=undefined&query=Burger&submitAction=ENTER`
    );
    const json = await data.json();
    console.log("JSON", json);
    setResInfo(json)
  };
  return resInfo;
};

export default useRestaurantMenu;
