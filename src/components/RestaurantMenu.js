import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";

const RestaurantMenu = () => {
  // const [resInfo, setInfo] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showItems, setShowItems] = useState(0);
  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.data?.cards[2]?.card?.card?.info || {};

  const menuItems =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards || [];
  console.log(
    "Menu Items",
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  );

  const categories =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log("Categories", categories);

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* Category Accordions */}
      {categories?.map((category, idx) => (
        <RestaurantCategories
          key={category?.card?.card?.categoryId}
          category={category?.card?.card}
          showItems={idx === showItems && true}
          setShowItems={() => {
            if(idx === showItems) {
              setShowItems(null)
            } else {
              setShowItems(idx)
            }
          }}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
