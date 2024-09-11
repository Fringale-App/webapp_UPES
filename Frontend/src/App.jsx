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
import { store ,persistor } from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';



import RestaurantPage from './pages/RestaurantPage';
import Bucket from './pages/Bucket';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PopUp from './components/PopUp';
import PrivateComponent from './components/PrivateComponent';
import Profile from './pages/Profile';
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
          <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
          <Route path="/bucket" element={<Bucket/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/popup" element={<PopUp/>} />
          <Route element={<PrivateComponent/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>

          
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
