import React from 'react'
import WeatherHeader from '../components/WeatherHeader'
import FoodOptions from '../components/FoodOptions'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
<div className='overflow-y-scroll min-h-full'>
  <WeatherHeader/>
  <FoodOptions/>
  <RestaurantList/>
</div>

  )
}

export default Home
