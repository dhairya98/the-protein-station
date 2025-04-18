import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategories = ({ category, showItems, setShowItems }) => {
  console.log("Category", category);

  const handleClick = () => {
    // setShowItems(!showItems);
    setShowItems();
  };

  return (
    <div>
      <div className="w-6/12 bg-gray-50 shadow-lg p-4 my-6 mx-auto ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {category?.title} ({category?.itemCards?.length})
          </span>
          <span>🔽</span>
        </div>
        {showItems && <ItemList items={category?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategories;
