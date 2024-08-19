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
import { Provider } from 'react-redux';
import { store ,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import RestaurantPage from './pages/RestaurantPage';
import Bucket from './pages/Bucket';
function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>

        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/swipe-filter" element={<SwipeFilter/>}/>
          <Route path="/food-filter" element={<Filter/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/restaurant" element={<RestaurantPage/>}/>
          <Route path="/bucket" element={<Bucket/>} />
          
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
