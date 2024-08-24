import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
    const [restaurants,setRestaurants] = useState([])
    useEffect(()=>{
        const fetchRestaurants = async () => {
            try {
              const restaurantRes = await fetch('http://localhost:3000/api/restaurant/get');
              const resData = await restaurantRes.json();
              setRestaurants(resData);
      
            } catch (error) {
              console.log(error);
            }
          }
        fetchRestaurants()
},[])
    


    return (
        <div className="p-4">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl mb-2 font-semibold">Explore Restaurant</h3>
                <p className="text-xs text-green-600">View All {">>"}</p>
            </div>

            <div className='sm:flex sm:justify-center sm:items-center sm:flex-wrap sm:gap-3'>
                {restaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
