import React,{useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

import weather from '../../Images/weather.png'
import clear_icon from '../../Images/clear.png'



const WeatherHeader = () => {

    const [weatherData , setWeatherData] = useState("")
    const [dateTime, setDateTime] = useState(new Date());
    const allIcons = {
      "01d":"https://openweathermap.org/img/wn/01d@2x.png",
      "01n":"https://openweathermap.org/img/wn/01n@2x.png",
      "02d":"https://openweathermap.org/img/wn/02d@2x.png",
      "02n":"https://openweathermap.org/img/wn/02n@2x.png",
      "03d":"https://openweathermap.org/img/wn/03d@2x.png",
      "03n":"https://openweathermap.org/img/wn/03n@2x.png",
      "04d":"https://openweathermap.org/img/wn/04d@2x.png",
      "04n":"https://openweathermap.org/img/wn/04n@2x.png",
      "09d":weather,
      "09n":weather,
      "10d":weather,
      "10n":weather,
      "13d":"https://openweathermap.org/img/wn/13d@2x.png",
      "13n":"https://openweathermap.org/img/wn/13n@2x.png",
      

    }
    const search = async (city)=>{
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
        // console.log(url)
        const response = await fetch(url)
        const data = await response.json()
        const currIcon = allIcons[data.weather[0].icon] || clear_icon
        // console.log(data)
        setWeatherData({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:currIcon,
          condition:data.weather[0].main

        })
      } catch(error){
        console.log(error+"hello")
      }
    }
   useEffect(()=>{
    search("Dehradun")
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
   },[])


 
  const optionsDate = { weekday: 'short', day: '2-digit', month: 'short' };
  const formattedDate = dateTime.toLocaleDateString('en-GB', optionsDate);

  // Format the time as "H:mm"
  const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
  const formattedTime = dateTime.toLocaleTimeString('en-GB', optionsTime);
//   console.log(value);
  return (
    <div className="mr-4 ml-4 py-3 bg-white border-b-2">
      {/* Top bar */}
    

      {/* Search bar */}


      {/* Weather and time section */}
      <div className="p-4 bg-blue-200 rounded-lg flex items-center min-h-[80px] justify-between bg-center w-full relative" style={{ backgroundImage: `url(${weatherData.icon})` }}>
        <div className="absolute top-9">
          <p className=" text-sm font-bold">{weatherData.condition} {weatherData.temperature}°C</p>
          <p className="text-xs font-bold">{formattedDate}</p>
        </div>
        <p className="text-xs absolute bottom-2 right-5 font-bold">{formattedTime}</p>
      </div>
     
      

      
    </div>
   
  );
};

export default WeatherHeader;
