import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeFood, dislikeFood, resetIndex } from '../redux/food/foodSlice'; 
import Card from '../components/FoodSwipeCard';
import PopUp from "../components/PopUp";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/style.css';

const SwipeFilter = () => {
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

  const closePopup = () => setIsOpen(false);

  const handleButtonHighlight = (buttonType) => {
    setHighlightedButton(buttonType);
    setTimeout(() => {
      setHighlightedButton(null);
    }, 1000); // 1 second delay
  };

  const handleLike = useCallback((currentFood) => {
    if (!currentFood) return;
    console.log("Like action triggered");
    dispatch(likeFood(currentFood));
    setLikePopup(true);
    handleButtonHighlight('like');
  }, [dispatch]);

  const handleDislike = useCallback((currentFood) => {
    if (!currentFood) return;
    console.log("Dislike action triggered");
    dispatch(dislikeFood(currentFood.id));
    handleButtonHighlight('dislike');
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) {
      setIsOpen(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 4000);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;

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
  }, [currentUser, condition, dispatch]);

  useEffect(() => {
    if (foodItems.length === 0 || loading || !swiperRef.current) return;

    const appendNewCard = () => {
      if (currentIndex >= foodItems.length) return;

      const currentFood = foodItems[currentIndex];
      const card = new Card({
        imageUrl: currentFood.imageUrls,
        foodName: currentFood.name,
        price:currentFood.regularPrice,
        onDismiss: () => {
          dispatch({ type: 'food/incrementIndex' });
          swiperRef.current.innerHTML = '';
          appendNewCard();
        },
        onLike: () => handleLike(currentFood),
        onDislike: () => handleDislike(currentFood),
      });

      swiperRef.current.innerHTML = '';
      swiperRef.current.append(card.element);
    };

    appendNewCard();

  }, [foodItems, loading, currentIndex, dispatch, handleLike, handleDislike]);

  const handleButtonClick = (action) => {
    const currentFood = foodItems[currentIndex];
    if (action === 'like') {
      handleLike(currentFood);
    } else {
      handleDislike(currentFood);
    }
    // Move to the next card
    dispatch({ type: 'food/incrementIndex' });
    if (swiperRef.current) {
      swiperRef.current.innerHTML = '';
      if (currentIndex + 1 < foodItems.length) {
        const nextCard = new Card({
          imageUrl: foodItems[currentIndex + 1].imageUrls,
          foodName: foodItems[currentIndex + 1].name,
          onDismiss: () => {},
          onLike: () => {},
          onDislike: () => {},
        });
        swiperRef.current.append(nextCard.element);
      }
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
          className={`px-6 py-2 ${
            highlightedButton === 'dislike' ? 'bg-red-800' : 'bg-red-500'
          } text-white font-bold rounded-full transition-colors duration-300`}
          onClick={() => handleButtonClick('dislike')}
        >
          <img src="https://img.icons8.com/emoji/48/000000/thumbs-down-emoji.png" alt="Dislike" />
        </button>
        <button 
          id="like" 
          className={`px-6 py-2 ${
            highlightedButton === 'like' ? 'bg-green-800' : 'bg-green-500'
          } text-white font-bold rounded-full transition-colors duration-300`}
          onClick={() => handleButtonClick('like')}
        >
          <img
            src="https://img.icons8.com/?size=48&id=FYJ9HNSqf_uK&format=png"
            alt="Thumbs Up"
            className="inline-block w-12 h-12"
          />
        </button>
      </div>

      {/* <div className="bucket-content mt-10">
        <h3>Bucket Items:</h3>
        {bucket.length > 0 ? (
          bucket.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))
        ) : (
          <p>No liked items yet.</p>
        )}
      </div> */}

      {likePopup && <PopUp isOpen={true} message="Item Liked!" onClose={() => setLikePopup(false)} />}

      <PopUp isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default SwipeFilter;