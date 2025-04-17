import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const [resInfo, setInfo] = useState(null);
  const {resId} = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9358325&lng=77.6328499&restaurantId=${resId}&catalog_qa=undefined&query=Burger&submitAction=ENTER`
    );
    const json = await data.json();
    console.log("JSON", json);
    setInfo(json);
  };

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.data?.cards[2]?.card?.card?.info || {};

  const menuItems = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
  console.log('Menu Items', menuItems);
  

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {menuItems.map(item => <li key ={item?.card?.info?.id}>{item?.card?.info?.name} - {item?.card?.info?.price/100}</li>)}
      </ul>
      
    </div>
  );
};

export default RestaurantMenu;
