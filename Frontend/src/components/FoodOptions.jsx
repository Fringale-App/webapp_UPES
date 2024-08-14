import React from "react";

const foodItems = [
  { name: "Burger", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", },  // Replace with actual image paths
  { name: "Pizza", image: "https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg" },
  { name: "Rolls", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2013/12/spring-rolls.jpg"},
  { name: "Fried Rice", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" },
  { name: "Burger", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" },  // Repeated items for scrolling effect
  { name: "Pizza", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" },
];

const FoodOptions = () => {
  return (
    <div className="p-4">
      {/* Horizontal line */}
      <hr className="border-[#00000080] mb-4" />
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">What's on your mind?</h2>
      
      {/* Food items list */}
      <div className="flex overflow-x-scroll no-scrollbar">
        {foodItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-24 text-center mr-4">
            <img src={item.image} alt={item.name} className="h-16 w-16 mx-auto mb-2 rounded-full" />
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodOptions;
