import React from "react";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  console.log("Items", items);

  return (
    <div>
      {items?.map((item) => {
        console.log("imageId", item?.card?.info?.imageId);

        return (
          <div
            key={item?.card?.info?.id}
            className="p-1 m-2 border-gray-100 border-b-2 text-left flex justify-between"
          >
            <div className="w-9/12">
              <div className="py-2">
                <span>{item?.card?.info?.name}</span>
                <span>
                  {" "}
                  - ₹{" "}
                  {item?.card?.info?.price / 100 ||
                    item?.card?.info?.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs">{item?.card?.info?.description}</p>
            </div>
            <div className="w-3/12 p-4">
              <div className="absolute">
                <button className="p-2 mx-14 rounded-lg bg-black shadow-lg text-white">
                  Add+
                </button>
              </div>
              <img src={`${CDN_URL}/${item?.card?.info?.imageId}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
