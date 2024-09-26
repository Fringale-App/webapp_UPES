import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ campus }) => {
    const kandholi = {
        cafeFrisco: "66c7534d734efe7b1bf8b59e",
    };

    const bidholi = {
        annapurna: "66c7534d734efe7b1bf8b599",
        bidholiFrisco: "66c7534d734efe7b1bf8b59a",
        chaiGaramBidholi: "66c7534d734efe7b1bf8b59b",
        maximus: "66c7534d734efe7b1bf8b59c",
        theKathiRoll: "66c7534d734efe7b1bf8b59d"
    };

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const restaurantRes = await fetch('/api/restaurant/get');
                const resData = await restaurantRes.json();
                setRestaurants(resData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRestaurants();
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl mb-2 font-semibold">Explore Restaurant</h3>
                <p className="text-xs text-green-600">View All {">>"}</p>
            </div>

            <div className='sm:flex sm:justify-center sm:items-center sm:flex-wrap sm:gap-3'>
                {/* Render All Restaurants */}
                {campus === 'All' && restaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}

                {/* Render Kandholi Restaurants */}
                {campus === 'Kandholi' && restaurants
                    .filter((restaurant) => restaurant._id === kandholi.cafeFrisco)
                    .map((restaurant, index) => (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    ))
                }

                {/* Render Bidholi Restaurants */}
                {campus === 'Bidholi' && restaurants
                    .filter((restaurant) =>
                        restaurant._id === bidholi.annapurna ||
                        restaurant._id === bidholi.bidholiFrisco ||
                        restaurant._id === bidholi.chaiGaramBidholi ||
                        restaurant._id === bidholi.maximus ||
                        restaurant._id === bidholi.theKathiRoll
                    )
                    .map((restaurant, index) => (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    ))
                }
            </div>
        </div>
    );
};

export default RestaurantList;

