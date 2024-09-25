import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeFood, dislikeFood, resetIndex } from '../redux/food/foodSlice'; 
import Card from '../components/FoodSwipeCard';
import PopUp from "../components/PopUp";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/style.css';
import PopUp2 from "../components/PopUp2";

const SwipeFilter = () => {
  const [randomItem, setRandomItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const location = useLocation();
  const condition = location.state || {};
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const bucket = useSelector((state) => state.food.bucket);
  const currentIndex = useSelector((state) => state.food.currentIndex);

  const [highlightedButton, setHighlightedButton] = useState(null);
  const swiperRef = useRef(null);
  const [matchFailed, setMatchFailed] = useState(false);

  const closePopup = () => {
    setIsOpen(false);
    setMatchFailed(false);
  }

  useEffect(() => {
    if (!currentUser) {
      setIsOpen(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 4000);
      return;
    }

    const fetchingItems = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/item/swipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(condition),
        });
        const data = await res.json();
        setFoodItems(data);
        dispatch(resetIndex());
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
      setLoading(false);
    };

    fetchingItems();
  }, [currentUser, condition, dispatch, navigate]);

  useEffect(() => {
    if (foodItems.length === 0 || loading) return;

    const randomIndex = Math.floor(Math.random() * foodItems.length);
    setRandomItem(foodItems[randomIndex]);
  }, [foodItems, loading]);

  const handleButtonHighlight = (buttonType) => {
    setHighlightedButton(buttonType);
    setTimeout(() => {
      setHighlightedButton(null);
    }, 1000);
  };

  const handleLike = useCallback((currentFood) => {
    if (!currentFood) return;
    console.log("Like action triggered", currentFood);

    if (randomItem && currentFood._id !== randomItem._id) {
      dispatch(dislikeFood()); // Update index before showing mismatch popup
      setMatchFailed(true);
      setTimeout(() => {
        setMatchFailed(false);
      }, 2000);
      return;
    }

    dispatch(likeFood(currentFood)); // Update index and add to bucket
    setLikePopup(true);
    handleButtonHighlight('like');
  }, [dispatch, randomItem]);

  const handleDislike = useCallback((currentFood) => {
    if (!currentFood) return;
    console.log("Dislike action triggered");
    dispatch(dislikeFood());
    handleButtonHighlight('dislike');
  }, [dispatch]);

  const updateCard = useCallback(() => {
    if (swiperRef.current && currentIndex < foodItems.length) {
      const nextFood = foodItems[currentIndex];
      const card = new Card({
        imageUrl: nextFood.imageUrls,
        foodName: nextFood.name,
        price: nextFood.regularPrice,
        onDismiss: () => {
          dispatch(dislikeFood());
        },
        onLike: () => handleLike(nextFood),
        onDislike: () => handleDislike(nextFood),
      });

      swiperRef.current.innerHTML = '';
      swiperRef.current.append(card.element);
    }
  }, [foodItems, currentIndex, dispatch, handleLike, handleDislike]);

  useEffect(() => {
    if (foodItems.length === 0 || loading || !swiperRef.current) return;
    updateCard();
  }, [foodItems, loading, currentIndex, updateCard]);

  const handleButtonClick = (action) => {
    const currentFood = foodItems[currentIndex];

    if (!currentFood) {
      console.error('Current food is null or undefined');
      return;
    }

    if (action === 'like') {
      handleLike(currentFood);
    } else {
      handleDislike(currentFood);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div id="swiper" ref={swiperRef} className="relative w-75 h-[75vh] perspective">
        {loading && <p>Loading...</p>}
      </div>

      <div className="flex mt-10 gap-16">
        <button 
          id="dislike" 
          className={`px-6 py-2 ${highlightedButton === 'dislike' ? 'bg-red-800' : 'bg-red-500'} text-white font-bold rounded-full transition-colors duration-300`}
          onClick={() => handleButtonClick('dislike')}
        >
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>
        <button 
          id="like" 
          className={`px-6 py-2 ${highlightedButton === 'like' ? 'bg-green-800' : 'bg-green-500'} text-white font-bold rounded-full transition-colors duration-300`}
          onClick={() => handleButtonClick('like')}
        >
          <img
            src="https://img.icons8.com/?size=48&id=FYJ9HNSqf_uK&format=png"
            alt="Thumbs Up"
            className="inline-block w-12 h-12"
          />
        </button>
      </div>

      {likePopup && <PopUp isOpen={true} message="Item Liked!" onClose={() => setLikePopup(false)} />}
      <PopUp isOpen={isOpen} onClose={closePopup} />
      {matchFailed && <PopUp2 isOpen={true} onClose={closePopup} />}
    </div>
  );
};

export default SwipeFilter;