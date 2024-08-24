import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { useDispatch } from "react-redux";
import { likeFood, dislikeFood } from '../redux/food/foodSlice';
import burger from '../../Images/burger.png';

const foodItems = [
  { id: 1, name: "Cheese Burger", price: 120, isVeg: true, image: burger, description: "A cheeseburger is a classic..." },
  { id: 2, name: "Pizza", price: 100, isVeg: false, image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", description: "A Pizza is a classic Italian dish..." },
  // Add other food items here...
];

const FoodSwipeCard = () => {
  const [currentIndex, setCurrentIndex] = useState(foodItems.length - 1);
  const dispatch = useDispatch();

  const handleSwipe = (direction, foodItem) => {
    if (direction === 'right') {
      dispatch(likeFood(foodItem));
    } else if (direction === 'left') {
      dispatch(dislikeFood());
    }

    // Move to the next card
    setCurrentIndex(currentIndex - 1);
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  return (
    <div className="flex flex-col items-center">
      {foodItems.map((foodItem, index) =>
        currentIndex === index && (
          <TinderCard
            key={foodItem.id}
            onSwipe={(dir) => handleSwipe(dir, foodItem)}
            onCardLeftScreen={() => outOfFrame(foodItem.name)}
            
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-[230px] bg-[#00643C] rounded-b-[50%] p-4 text-center">
                <h2 className="text-white text-2xl font-bold">{foodItem.name}</h2>
                <p className="text-white text-sm">Starting from ${foodItem.price}</p>
                <img 
                  src={foodItem.image}
                  alt={foodItem.name}
                  className="w-60 h-30 mt-8 mx-auto -mb-12 rounded-lg"
                />
              </div>

              <div className="p-4 pt-12 border shadow-md bg-gray-100 text-gray-700">
                <div className="mb-4">
                  <button className="px-4 py-1 border-2 border-green-700 rounded-full font-bold text-sm text-[#00643C]">Details</button>
                  <p className="mt-2 text-sm">{foodItem.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Tags:</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Cheese</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Burger</span>
                </div>
              </div>
            </div>
          </TinderCard>
        )
      )}

      <div className="flex mt-4 mb-4 gap-16">
        <button
          onClick={() => handleSwipe('left', foodItems[currentIndex])}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-full"
        >
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>

        <button
          onClick={() => handleSwipe('right', foodItems[currentIndex])}
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full"
        >
          <img
            src="https://img.icons8.com/?size=48&id=FYJ9HNSqf_uK&format=png"
            alt="Thumbs Up"
            className="inline-block w-12 h-12"
          />
        </button>
      </div>
    </div>
  );
};

export default FoodSwipeCard;


