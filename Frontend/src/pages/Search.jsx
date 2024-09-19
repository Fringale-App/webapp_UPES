import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const foodItems = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 120,
    isVeg: true,
    image: "https://example.com/cheese-burger.jpg",
    description:
      "A cheeseburger with a juicy beef patty and melted cheese on a sesame bun.",
  },
  {
    id: 2,
    name: "Pizza",
    price: 100,
    isVeg: false,
    image: "https://example.com/pizza.jpg",
    description:
      "Classic Italian pizza with a soft crust and melted cheese.",
  },
  {
    id: 3,
    name: "Fries",
    price: 50,
    isVeg: true,
    image: "https://example.com/fries.jpg",
    description: "Crispy golden fries, salted to perfection.",
  },
  {
    id: 4,
    name: "Salad",
    price: 70,
    isVeg: true,
    image: "https://example.com/salad.jpg",
    description: "Fresh green salad with a mix of lettuce, tomato, and cucumber.",
  },
  // Add more food items here
];

const Search = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Extract the search term from the URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl.toLowerCase());
    }
  }, [location]);

  useEffect(() => {
    if (searchTerm) {
      // Filter food items based on the search term
      const results = foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm]);

  return (
    <div className="search-page">
      <h1 className="text-center text-xl font-bold">Search Results for: {searchTerm}</h1>
      <div className="food-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((food) => (
            <div key={food.id} className="food-item p-4 border rounded-lg">
              <img src={food.image} alt={food.name} className="h-40 w-full object-cover rounded-md" />
              <h3 className="mt-2 text-lg font-bold">{food.name}</h3>
              <p>{food.description}</p>
              <p className="mt-1 text-gray-500">Price: ${food.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-6">No food items match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
