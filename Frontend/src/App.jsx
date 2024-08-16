// src/App.jsx
import React from 'react';
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import WeatherHeader from './components/WeatherHeader';
import FoodOptions from './components/FoodOptions';
import Home from './pages/Home';
import Header from './components/Header';
import SwipeFilter from './pages/SwipeFilter';
import Filter from './pages/Filter';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/swipe-filter" element={<SwipeFilter/>}/>
        <Route path="/food-filter" element={<Filter/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
