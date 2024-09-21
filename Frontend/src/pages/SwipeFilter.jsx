import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeFood, dislikeFood } from '../redux/food/foodSlice'; // Adjust the import path as needed
import burger from '../../Images/burger.png';
import Card from '../components/FoodSwipeCard'; // Assuming this is a class-based component
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import '../css/style.css';

const SwipeFilter = () => {
  const [foodItems, setFoodItems] = useState([]);
  const location = useLocation();
  const condition = location.state || {};
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Select the current user from Redux state
  const currentUser = useSelector((state) => state.user.currentUser);

  // Function to close the popup without navigating to the bucket
  const closePopup = () => {
    setIsOpen(false); // Only close the popup, do not navigate
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

    // Fetch food items when the component mounts
    const fetchingItems = async () => {
      setLoading(true); // Start loading when fetching begins
      try {
        const res = await fetch('/api/item/swipe', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(condition),
        });
        const data = await res.json();
        console.log(data);
        setFoodItems(data); // Set the food items state
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
      setLoading(false); // Stop loading after fetching completes
    };

    fetchingItems();
  }, [currentUser, condition]);

  useEffect(() => {
    if (foodItems.length === 0 || loading) return; // Wait for foodItems to be set and loading to complete

    const swiper = document.querySelector("#swiper");
    const like = document.querySelector("#like");
    const dislike = document.querySelector("#dislike");
    
    let cardCount = 0;

    const appendNewCard = () => {
      if (foodItems.length === 0) return; // Prevent appending if no items

      const currentFood = foodItems[cardCount % foodItems.length];
      const card = new Card({
        imageUrl: currentFood.imageUrls,
        foodName: currentFood.name,
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

    // Clear swiper before appending new cards
    swiper.innerHTML = '';

    for (let i = 0; i < foodItems.length; i++) {
      appendNewCard();
    }
    
  }, [foodItems, loading]); // Only run when foodItems or loading changes

  return (
    <div className="flex flex-col items-center relative">
      <div id="swiper" className="relative w-75 h-[75vh] perspective">
        {/* Cards will be appended here dynamically */}
        {loading && <p>Loading...</p>}
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



