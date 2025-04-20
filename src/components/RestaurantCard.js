import React from 'react'
import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {
    const { name, cuisines, avgRating, costForTwo, sla } = resData?.info;
    return (
      <div data-testid="resCard" className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
        <img
          className="rounded-lg"
          src={`${CDN_URL}/${resData?.info?.cloudinaryImageId}`}
          alt="res-logo"
        />
        <h3 className='font-bold py-4 text-xl'>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla?.slaString}</h4>
      </div>
    );
  };

export default RestaurantCard
