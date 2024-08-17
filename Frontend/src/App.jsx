// src/App.jsx
import React from 'react';
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import WeatherHeader from './components/WeatherHeader';
import FoodOptions from './components/FoodOptions';
import Home from './pages/Home';
import Header from './components/Header';
import SwipeFilter from './pages/SwipeFilter';
import Filter from './pages/Filter';
import Search from './pages/Search';
function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/swipe-filter" element={<SwipeFilter/>}/>
        <Route path="/food-filter" element={<Filter/>}/>
        <Route path="/search" element={<Search/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
