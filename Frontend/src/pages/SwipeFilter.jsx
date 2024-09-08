import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeFood, dislikeFood } from '../redux/food/foodSlice'; // Adjust the import path as needed
import burger from '../../Images/burger.png';
import Card from '../components/FoodSwipeCard';
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router";
import '../css/style.css';

const SwipeFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Select the current user from Redux state
  const currentUser = useSelector((state) => state.user.currentUser);

  // Function to close the popup and navigate to the bucket
  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/bucket'); // Navigate to another page after animation ends
    }, 50);
  };

  // Check if the user is authenticated, if not navigate to sign-in
  useEffect(() => {
    if (!currentUser) {
      setIsOpen(true); // Show popup
      setTimeout(() => {
        navigate('/sign-in'); // Redirect to sign-in after 4 seconds
      }, 4000);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return; // Exit early if no user is logged in

    const swiper = document.querySelector("#swiper");
    const like = document.querySelector("#like");
    const dislike = document.querySelector("#dislike");
    const foodItems = [
      {
        id: 1,
        name: "Cheese Burger",
        price: 120,
        isVeg: true,
        image: burger,
        description:
          "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun.",
      },
      {
        id: 2,
        name: "Pizza",
        price: 100,
        isVeg: false,
        image:
          "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
        description:
          "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame.",
      },
    ];

    let cardCount = 0;
    if (isOpen) {
      const timer = setTimeout(closePopup, 4000); // Close popup after 4 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when state changes
    }

    const appendNewCard = () => {
      const currentFood = foodItems[cardCount % foodItems.length];
      const card = new Card({
        imageUrl: currentFood.image,
        onDismiss: appendNewCard,
        onLike: () => {
          setIsOpen(true);
          dispatch(likeFood(currentFood));
          like.style.animationPlayState = "running";
          like.classList.toggle("trigger");
        },
        onDislike: () => {
          dispatch(dislikeFood());
          dislike.style.animationPlayState = "running";
          dislike.classList.toggle("trigger");
        },
      });
      swiper.append(card.element);
      cardCount++;

      const cards = swiper.querySelectorAll(".card:not(.dismissing)");
      cards.forEach((card, index) => {
        card.style.setProperty("--i", index);
      });
    };

    for (let i = 0; i < foodItems.length; i++) {
      if (cardCount < foodItems.length) {
        appendNewCard();
      }
    }
  }, [isOpen, currentUser]);

  return (
    <div className="flex flex-col items-center relative">
      <div id="swiper" className="relative w-75 h-[75vh] perspective">
        {/* Cards will be appended here dynamically */}
      </div>

      <div className="flex mt-10 gap-16">
        <button id="dislike" className="px-6 py-2 bg-red-500 text-white font-bold rounded-full">
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>
        <button id="like" className="px-6 py-2 bg-green-500 text-white font-bold rounded-full">
          <img
            src="https://img.icons8.com/?size=48&id=FYJ9HNSqf_uK&format=png"
            alt="Thumbs Up"
            className="inline-block w-12 h-12"
          />
        </button>
      </div>

      <PopUp isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default SwipeFilter;
