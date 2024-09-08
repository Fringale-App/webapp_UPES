import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeFood, dislikeFood } from '../redux/food/foodSlice.jsx'; // Adjust the import path as needed
import burger from '../../Images/burger.png';
import Card from '../components/FoodSwipeCard'
import '../css/style.css'
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router";


// const foodItems = [
//   { id:1,
//     name: "Cheese Burger",
//     price: 120,
//     isVeg: true,
//     image: burger,
//     description: "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun." },
//   { id:2,
//     name: "Pizza",
//     price: 100,
//     isVeg: false,
//     image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", 
//     description: "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame." },
//   // Add other food items here...
// ];

const SwipeFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/bucket'); // Navigate to another page after animation ends
    }, 50); // Delay navigation to allow animation to finish
  };




  // // Access the current index and bucket from Redux state
  // const currentIndex = useSelector((state) => state.food.currentIndex);

  // // Handle index wrapping when reaching the end of the foodItems array
  // const currentFood = foodItems[currentIndex % foodItems.length];

  // const handleLike = () => {
  //   dispatch(likeFood(currentFood));
  // };

  // const handleDislike = () => {
  //   dispatch(dislikeFood());
  // };




  useEffect(() => {
    const swiper = document.querySelector("#swiper");
    const like = document.querySelector("#like");
    const dislike = document.querySelector("#dislike");
    const foodItems = [
      { id:1,
        name: "Cheese Burger",
        price: 120,
        isVeg: true,
        image: burger,
        description: "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun." },
      { id:2,
        name: "Pizza",
        price: 100,
        isVeg: false,
        image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", 
        description: "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame." },
      // Add other food items here...
    ];

    // const urls = [
    //   burger,
    //   "https://images.unsplash.com/photo-1585180753283-c3ecb2d15106?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1560419284-6c2d2b5e0483?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1610041321461-37a7d578ebad?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1724403319085-90e0c45befa5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // ];

    let cardCount = 0;
    if (isOpen) {
      const timer = setTimeout(closePopup, 4000); // Close popup after 4 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when state changes
    }

    const appendNewCard = () => {
      const currentFood = foodItems[cardCount % foodItems.length]
      const card = new Card({
        imageUrl: foodItems[cardCount % foodItems.length].image,
        onDismiss: appendNewCard,
        onLike: () => {
          setIsOpen(true)
          dispatch(likeFood(currentFood));
          like.style.animationPlayState = "running";
          like.classList.toggle("trigger");
        },
        onDislike: () => {
          dispatch(dislikeFood());
          dislike.style.animationPlayState = "running";
          dislike.classList.toggle("trigger");
        },
        foodName:"chesse"
      });
      swiper.append(card.element);
      cardCount++;

      const cards = swiper.querySelectorAll(".card:not(.dismissing)");
      cards.forEach((card, index) => {
        card.style.setProperty("--i", index);
      });
    };
   
      for (let i = 0; i < foodItems.length; i++) {
        if(cardCount<foodItems.length){
          appendNewCard();
        } 
      }
    
   
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center relative">
      {/* <ion-icon id="dislike" name="heart-dislike" className="text-8xl bg-black bg-opacity-50 rounded-full p-5 text-gray-500"></ion-icon> */}
      <div id="swiper" className="relative w-75 h-[75vh] perspective">
        {/* Cards will be appended here dynamically */}
      </div>

      {/* <ion-icon id="like" name="heart" className="text-8xl bg-white bg-opacity-50 rounded-full p-5 text-red-500"></ion-icon> */}
      <div className="flex mt-10 gap-16">
        <button
          id="dislike" name="dislike"
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-full"
        >
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>

        <button
          id="like" name="like"
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full"
        >
          <img
            src="https://img.icons8.com/?size=48&id=FYJ9HNSqf_uK&format=png"
            alt="Thumbs Up"
            className="inline-block w-12 h-12"
          />
        </button>
      </div>
      <PopUp isOpen={isOpen} onClose={closePopup}/>
    </div>
  );
}

export default SwipeFilter;
