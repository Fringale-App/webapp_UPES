import React from 'react'
import res from '../../Images/res3.jpg'
import fringaleLogo from '../../Images/fringaleLogo.png'
import wada from '../../Images/wada.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useState, useEffect } from 'react';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { NavLink } from 'react-router-dom';
// const foodItems = [
//   {
//     name: "Cheese Burger",
//     price: 120,
//     isVeg: true,
//     image: wada,
//     description: "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun."
//   },
//   {
//     name: "Pizza",
//     price: 100,
//     isVeg: false,
//     image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
//     description: "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame."
//   },
//   // Add other food items here...
// ];
// const shops = [
//   {
//     name: "Restaurant Name",

//     imageUrls: [res, "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4="],
//     time: "8 AM - 6 PM",
//     priceRange: "40-200",
//     description: "A cheeseburger is a classic American dish that combines a juicy beef patty with a slice of melted cheese, typically served on a sesame bun.",
//     address: "Address 1 (First Floor)"
//   },
//   {
//     name: "Pizza",

//     imageUrls: ["https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4="],
//     time: "8 AM - 6 PM",
//     priceRange: "40-200",
//     description: "A Pizza is a classic Italian dish that combines a soft crust with a slice of melted cheese, typically served on a sesame.",
//     address: "Address 2"
//   },
//   // Add other food items here...
// ];


function RestaurantPage() {

  SwiperCore.use([Navigation]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams()
  const [resFoods, setResFoods] = useState([]);
const { currentUser } = useSelector((state) => state.user);



  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/restaurant/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setRestaurant(data);
        const response = await fetch(`/api/restaurant/foods/${params.id}`);
        const info = await response.json();
        if (info.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setResFoods(info);
        // console.log("the info ",info)
        // console.log("the data ",resFoods[0].imageUrls)
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [/*params.restaurantId*/]);
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {restaurant && !loading && !error && (
        <div className="relative">
          <Swiper navigation>
            {restaurant.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[229px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                >
                </div>


              </SwiperSlide>
            ))}
          </Swiper>
          <div className='w-[250px] rounded-md z-10 absolute mx-auto h-[77px] p-4 top-70 left-1/2 bg-white shadow-md' style={{ transform: 'translate(-50%, -50%)' }}>
            <div className='flex gap-1 flex-col justify-center items-center text-[10px] font-normal '>
              <div className='flex gap-1 items-center'>
                <MdOutlineLocationOn className='text-[#00643c] h-[16px] w-[13px]' />
                <p className='text-[10px]'>{restaurant.address}</p>

              </div>
              <div className='h-[1px] w-[219px] bg-[#E0E0E0]'>

              </div>




              <div className='flex gap-3'>
                <div>
                  <p>Price Range</p>
                  <div className='flex items-center justify-center'>
                    <p><FaRupeeSign /></p>
                    <p className='font-semibold'>{restaurant.priceRange || "40-200"} </p>
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
              />
              <div className="absolute pointer-events-none top-1 left-9">
                <p className='text-[12px] font-semibold text-[#424242]'>SEARCH</p>
                <p className='text-[10px] font-normal text-[#424242]'>search from {restaurant.name}</p>

              </div>

            </form>

          </div>
          <div className='text-[10px] mr-4 ml-4 font-semibold text-[#616161] flex gap-3 px-1'>
            <div className='border border-[#616161] p-1 rounded-md'>
              <input type="checkbox" className='w-2 mr-1 h-2' />Filter

            </div>
            <div className='border border-[#616161] p-1 rounded-md'>
              <input type="checkbox" className='w-2 mr-1 h-2' />VEG

            </div>
            <div className='border border-[#616161] p-1 rounded-md'>
              <input type="checkbox" className='w-2 mr-1 h-2' />NON VEG

            </div>
            <div className='border border-[#616161] p-1 rounded-md'>
              <input type="checkbox" className='w-2 mr-1 h-2' />EGG

            </div>
          </div>
          <p className='ml-4 sm:text-center font-bold mt-2'>Menu</p>
          <div className='px-2 flex relative flex-col gap-3 pt-2'>
            {resFoods.map((food,index) => (
              <div key={index} className='flex gap-2 max-h-[120px] min-h-[120px] py-2 px-2 shadow-lg rounded-md'>
                <div className='max-w-[30vw] min-w-[30vw] h-[100px]'>
                {/* <iframe className='w-full h-full object-cover' src={Array.isArray(food.imageUrls) ? food.imageUrls[0] : food.imageUrls}></iframe> */}
                  <img src={food.imageUrls} alt={food.name} className='w-full rounded-lg h-full object-cover' />
                </div>
                <div className='w-70vw h-[120px]'>
                  <div className='flex justify-between'>
                    <div
                      className={`flex justify-center items-center w-4 h-4 border rounded-sm ${food.isVeg ? 'border-green-600' : 'border-red-600'}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-green-600' : 'bg-red-600'}`}
                      ></div>
                    </div>
                    <div className="flex items-center">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 mr-1 text-green-600 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-xs text-white px-2 rounded-sm bg-green-600 font-semibold">
                        {4.2}
                      </p>
                    </div>

                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-3'>
                      <p className='text-[14px] w-30 h-10 font-medium'>{food.name}</p>
                      <p className='text-[10px] font-normal'>{food.description.length>20 ? food.description.slice(0,20)+"...": food.description || "Healthy food.." }</p>
                    </div>
                    <div className='w-[61px] bg-slate-200 mt-2 flex justify-center items-center h-[16px] rounded-sm'>
                      <p className='text-[10px] font-normal'>48 ratings</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex justify-center items-center text-[14px] font-semibold text-[#212121]'>
                      <FaRupeeSign/>
                      {food.regularPrice}
                    </div>
                    <FaRegHeart className='text-[#212121]'/>

                  </div>

                </div>
              </div>
            ))}
             <button className='w-[75px] h-[75px] rounded-full bg-[#00643c] text-[11px] flex flex-col items-center justify-center text-white absolute bottom-1 right-0'>
              <img src={fringaleLogo} className='h-[26px] w-[33px] font-normal' alt="" />
              <p>Visit</p>
              <p>Website</p>
            </button>

          
          </div>

          {/* <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
          <FaShare
            className='text-slate-500'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          />
        </div> */}
          {/* {copied && (
          <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
            Link copied!
          </p>
        )} */}
          {/* <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          <p className='text-2xl font-semibold'>
            {restaurant.name}
          </p>
          <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
            <FaMapMarkerAlt className='text-green-700' />
            {restaurant.address}
          </p>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description - </span>
            {restaurant.description}
          </p>
          <NavLink to={`/edit-menu/${params.restaurantId}`}
        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
        >
          View Menu          
        </NavLink>
    
          </div> */}

        </div>)}
    </main>
  )
}

export default RestaurantPage