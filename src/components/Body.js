import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantData);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRestaurants(restaurantData);
  }, [restaurantData]);

  const fetchData = async () => {
    const apiData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9358325&lng=77.6328499&collection=83637&tags=layout_CCS_Pizzas&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const jsonData = await apiData.json();
    const relavantData = jsonData?.data?.cards?.slice(3);
    setRestaurantData(relavantData);
  };

  const onlineStatus = useOnlineStatus();
  console.log("Online Status", onlineStatus);

  if (!onlineStatus) {
    return <h1>Looks like you are offline</h1>;
  }

  return restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="search m-4 p-4 flex items-center">
          <input
            value={searchText}
            className="border border-solid border-black"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 m-4 bg-green-100 rounded-lg"
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
          <div>
            <button
              onClick={() =>
                setFilteredRestaurants(
                  restaurantData.filter(
                    (restaurant) => restaurant?.info?.avgRating >= 4.4
                  )
                )
              }
              className="px-4 py-2 m-4 bg-gray-100 rounded-lg"
            >
              Top-rated restaurants
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {/* Restaurant Cards */}
        {/* <RestaurantCard resData={restaurantData[0]} />
          <RestaurantCard resData={restaurantData[1]} /> */}
        {filteredRestaurants?.map((restaurant) => (
          <Link
            to={`restaurants/${restaurant?.card?.card?.info?.id}`}
            key={restaurant?.card?.card?.info?.id}
          >
            {/* If restaurant is promoted, then add a label to it */}
            {restaurant?.card?.card?.info?.promoted ? <RestaurantCardPromoted resData={restaurant?.card?.card}/> : <RestaurantCard resData={restaurant?.card?.card} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 mt-0 p-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    );
  };
};

export default Body;
