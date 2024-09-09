import React, { useEffect } from 'react';
import WeatherHeader from '../components/WeatherHeader';
import FoodOptions from '../components/FoodOptions';
import RestaurantList from '../components/RestaurantList';
import Swiper from '../components/Swiper';
import {useSelector,useDispatch} from 'react-redux';
import { signOutUserSuccess } from '../redux/user/userSlice';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // Function to get the user's location
  const getUserLocation = () => {
    const userId = currentUser?.data?._id; // Access user ID from `currentUser.data`
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          if (userId) {
            updateLocationOnBackend(userId, latitude, longitude);
          } else {
            console.error("User ID is not available");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  

  // Function to send location to backend
  const updateLocationOnBackend = async (userId, latitude, longitude) => {
    try {
      console.log('Sending Data:', { userId, latitude, longitude });  
      const response = await fetch('http://localhost:3000/api/user/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          latitude,
          longitude,
        }),
      });

      const data = await response.json();  // Check the response format
      console.log('Response Data:', data);
      if (data.success) {
        console.log("Location updated successfully");
      } else {
        console.log("Failed to update location");
      }
    } catch (error) {
      console.error("Error sending location:", error);
    }
  };

  // Call getUserLocation when the component mounts
  useEffect(() => {
   if(currentUser){
    getUserLocation();
   }
  }, [currentUser]);  // Dependency array ensures it runs if currentUser changes
  // function deleteUser (){
  //   dispatch(signOutUserSuccess());
   
  // }

  return (
    <div className='overflow-y-scroll min-h-full'>
      <WeatherHeader />
      {/* <div>
        <button onClick={deleteUser} className='p-2 bg-black text-white '>Delete User</button>
      </div> */}
      <Swiper />
      <FoodOptions />
      <RestaurantList />
    </div>
  );
};

export default Home;
