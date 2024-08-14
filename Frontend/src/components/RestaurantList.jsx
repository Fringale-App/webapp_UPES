import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
    const sampleRestaurant = {
        name: "Restaurant Name",
        cuisine: "North Indian | Chinese | Sweets",
        rating: "4.2",
        price: "90",
        image: "restaurant_image.jpg", // Replace with actual image path
    };
  
    // Creating multiple cards for testing scrolling
    const restaurantArray = Array(10).fill(sampleRestaurant);

    return (
        <div className="p-4">
            {restaurantArray.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantList;
