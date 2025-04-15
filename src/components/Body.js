import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantData);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRestaurants(restaurantData);
  }, [restaurantData]);

  const fetchData = async () => {
    const apiData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9358325&lng=77.6328499&collection=83637&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const jsonData = await apiData.json();
    const relavantData = jsonData?.data?.cards?.slice(3);
    setRestaurantData(relavantData);
  };

  return restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredData = restaurantData.filter((restaurant) =>
                restaurant?.card?.card?.info?.name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredData);
            }}
          >
            Search
          </button>
        </div>
        <button
          onClick={() =>
            setFilteredRestaurants(
              restaurantData.filter(
                (restaurant) => restaurant?.info?.avgRating >= 4.4
              )
            )
          }
          className="filter-btn"
        >
          Top-rated restaurants
        </button>
      </div>
      <div className="res-container">
        {/* Restaurant Cards */}
        {/* <RestaurantCard resData={restaurantData[0]} />
          <RestaurantCard resData={restaurantData[1]} /> */}
        {filteredRestaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant?.card?.card?.info?.id}
            resData={restaurant?.card?.card}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
