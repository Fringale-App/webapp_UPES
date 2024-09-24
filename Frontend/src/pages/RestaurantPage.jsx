import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRupeeSign, FaSearch, FaRegHeart, FaHeart } from "react-icons/fa";
import 'swiper/css/bundle';
import { likeFood, removeFromBucket } from '../redux/food/foodSlice';

function RestaurantPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resFoods, setResFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { bucket } = useSelector((state) => state.food);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/restaurant/get/${params.id}`);
        const data = await res.json();
        if (!res.ok || data.success === false) throw new Error('Failed to fetch restaurant details');
        setRestaurant(data);

        const response = await fetch(`/api/restaurant/foods/${params.id}`);
        const info = await response.json();
        if (!response.ok || info.success === false) throw new Error('Failed to fetch restaurant foods');
        setResFoods(info);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [params.id, currentUser]);

  const handleLike = async (e, food) => {
    e.preventDefault();
    const isInBucket = await bucket.some(item => item.name === food.name);

    if (isInBucket) {
      // Remove the food from the bucket
      console.log("foodid:",food.id,"food_id:",food._id)
      dispatch(removeFromBucket(food._id)); // Use food.id to match the unique identifier
    } else {
      // Add the food to the bucket
      dispatch(likeFood(food));
    }
  };

  const filteredFoods = resFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {restaurant && !loading && !error && (
        <div className="relative">
          <Swiper navigation spaceBetween={50} slidesPerView={1}>
            {restaurant.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='h-[229px] bg-center bg-no-repeat bg-cover'
                  style={{ backgroundImage: `url(${url})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='w-[250px] rounded-md z-10 absolute mx-auto h-[77px] p-4 top-70 left-1/2 bg-white shadow-md' style={{ transform: 'translate(-50%, -50%)' }}>
            <div className='flex gap-1 flex-col justify-center items-center text-[10px] font-normal'>
              <div className='flex gap-1 items-center'>
                <MdOutlineLocationOn className='text-[#00643c] h-[16px] w-[13px]' />
                <p className='text-[10px]'>{restaurant.address}</p>
              </div>
              <div className='h-[1px] w-[219px] bg-[#E0E0E0]'></div>
              <div className='flex gap-3'>
                <div>
                  <p>Price Range</p>
                  <div className='flex items-center justify-center'>
                    <p><FaRupeeSign /></p>
                    <p className='font-semibold'>{restaurant.priceRange || "40-200"}</p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <p>Opening hours</p>
                  <p className='font-semibold'>{restaurant.time || '8 AM - 6 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 mb-4 mr-4 ml-4 relative">
            <form className='relative'>
              <button>
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#424242]" />
              </button>
              <input
                type="text"
                className="w-full z-10 pl-10 pr-3 py-2 border border-[#424242] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search for food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <p className='ml-4 sm:text-center font-bold mt-2'>Menu</p>
          <div className='px-2 flex flex-col gap-3 pt-2'>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => {
                const isInBucket = bucket.some(item => item.name === food.name); // Check if the food is in the bucket

                return (
                  <div key={food.id} className='flex gap-2 max-h-[120px] min-h-[120px] py-2 px-2 shadow-lg rounded-md bg-white'>
                    <div className='max-w-[30vw] min-w-[30vw] h-[100px]'>
                      <img src={food.imageUrls} alt={food.name} className='w-full h-full object-cover rounded-lg' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <div className={`flex justify-center items-center w-4 h-4 border rounded-sm ${food.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                          <div className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <p className='text-[14px] font-medium'>{food.name}</p>
                        <p className='text-[10px] font-normal'>{food.description.slice(0, 20)}...</p>
                      </div>
                      <div className='flex justify-between'>
                        <div className='flex items-center text-[14px] font-semibold text-[#212121]'>
                          <FaRupeeSign />{food.regularPrice}
                        </div>
                        <button 
                          onClick={(e) => handleLike(e, food)}
                          className="focus:outline-none"
                        >
                          {isInBucket ? (
                            <FaHeart className='text-red-600' />
                          ) : (
                            <FaRegHeart className='text-[#212121]' />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className='text-center'>No food items found</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default RestaurantPage;

