import React from "react";
import heart from '../../Images/heart.svg';
import rest from '../../Images/res3.jpg'
import { NavLink } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
  <NavLink to="/restaurant">
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-4">
      {/* Top Image Section */}
      <div className="relative">
        <img
          src={rest || restaurant.img}
          alt={restaurant.name}
          className="w-full h-[220px] object-cover object-center"
        />
        <div className="absolute top-[-20px] right-[-25px] bg-gray-800 text-white px-4 py-3 rounded-full">
         <p className="mt-4 text-xs mr-4"> Starting from ${restaurant.price}</p> 
        </div>
      </div>

      {/* Restaurant Info Section */}
      <div className="p-2 border-b-2">
        <div className="flex justify-between">
          <div>
            <h3 className="text-md font-semibold">{restaurant.name}</h3>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
          </div>
          <div className="flex items-center">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-1 text-green-600 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm text-white px-4 py-1 rounded-md bg-green-600 font-semibold">
              {restaurant.rating}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="px-4 pt-2 pb-4 flex justify-between gap-10 items-center">
        <button className="flex items-center text-xs text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Offers Available
        </button>
        <button className="flex items-center text-xs text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          View Combos
        </button>
      </div>
    </div>
  </NavLink>
  );
};

export default RestaurantCard;
