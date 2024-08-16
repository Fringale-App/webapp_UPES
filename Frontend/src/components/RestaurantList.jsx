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
            <div className='flex justify-between items-center'>
                <h3 className="text-xl mb-2 font-semibold">Explore Restaurant</h3>
                <p className="text-xs text-green-600">View All {">>"}</p>
            </div>

            <div className='sm:flex sm:justify-center sm:items-center sm:flex-wrap sm:gap-3'>
                {restaurantArray.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
