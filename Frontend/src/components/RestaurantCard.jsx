import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto mb-4">
      {/* Top Image Section */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          Starting from ${restaurant.price}
        </div>
      </div>

      {/* Restaurant Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-green-600 font-semibold">
              {restaurant.rating}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 text-green-600 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <button className="flex items-center text-blue-500">
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
        <button className="flex items-center text-blue-500">
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
  );
};

export default RestaurantCard;
