import React, { useState } from "react";
import burger from '../../Images/burger.png'

const foodItems = [
  { name: "Cheese Burger",
     price: 120,
     isVeg:true,
     image: burger, 
    description: "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun." },
    { name: "Pizza",
        price: 100,
        isVeg:false,
        image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", 
       description: "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame." },
  // Add other food items here...
];

const FoodSwipeCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bucket, setBucket] = useState([]);

  const handleLike = () => {
    setBucket([...bucket, foodItems[currentIndex]]);
    handleNext();
  };

  const handleDislike = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
  };

  const currentFood = foodItems[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-[230px] bg-[#00643C] rounded-b-[50%] p-4 text-center">
          <h2 className="text-white text-2xl font-bold">{currentFood.name}</h2>
          <p className="text-white text-sm">Starting from ${currentFood.price}</p>
          <img 
            src={currentFood.image}
            alt={currentFood.name}
            className="w-60 h-30 mt-8 mx-auto -mb-12 rounded-lg"
          />
        </div>

        <div className="p-4 pt-12 border shadow-md  bg-gray-100 text-gray-700">
          <div className="mb-4  ">
            <button className="px-4 py-1 border-2 border-green-700 rounded-full font-bold text-sm text-[#00643C] ">Details</button>
            <p className="mt-2 text-sm">{currentFood.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Tags:</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Cheese</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Burger</span>
            {/* Add more tags as needed */}
          </div>
        </div>


      </div>
      <div className="flex mt-4 gap-16 ">
        <button
          onClick={handleDislike}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-full"
        >
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>

        <button
  onClick={handleLike}
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
