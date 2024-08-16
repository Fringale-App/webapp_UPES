import React from 'react'
import WeatherHeader from '../components/WeatherHeader'
import FoodOptions from '../components/FoodOptions'
import RestaurantList from '../components/RestaurantList'
import Swiper from '../components/Swiper'

const Home = () => {
  return (
<div className='overflow-y-scroll min-h-full'>
  <WeatherHeader/>
  <Swiper/>
  <FoodOptions/>
  <RestaurantList/>
</div>

  )
}

export default Home
