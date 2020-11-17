import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const OpenWeatherAPIContext = createContext();

const OpenWeatherAPIContextProvider = ({ children }) => {
  //latitude and longitude
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");

  //current weather conditions
  const [isCurrentLoaded, setIsCurrentLoaded] = useState(false);
  const [openWeatherCurrentData, setOpenWeatherCurrentData] = useState(
    JSON.parse(localStorage.getItem("openWeatherCurrentData")) || [] 
  );
  const [currentDate, setCurrentDate] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [currentTempMin, setCurrentTempMin] = useState("");
  const [currentTempMax, setCurrentTempMax] = useState("");
  const [currentHumidity, setCurrentHumidity] = useState("");
  const [currentWeatherMain, setCurrentWeatherMain] = useState("");
  const [currentIcon, setCurrentIcon] = useState("");

  //forecast weather conditions
  const [openWeatherForecastData, setOpenWeatherForecastData] = useState(
    JSON.parse(localStorage.getItem("openWeatherForecastData")) || [] 
  );

  useEffect(() => {
    getCurrentGeolocalization();
  }, [currentLatitude]);

  useEffect(() => {
    if(currentLatitude && currentLongitude) {
      getCurrentOpenWeatherAPI(currentLatitude, currentLongitude);
    } else {
      console.log("Still trying to get Latitude and Longitude values");
    }
    
  }, [currentLatitude, currentLongitude]);

  useEffect(() => {
    if(currentLatitude && currentLongitude) {
      getForecastOpenWeatherAPI(currentLatitude, currentLongitude);
    } else {
      console.log("Still trying to get Latitude and Longitude values");
    }
    
  }, [currentLatitude, currentLongitude]);

  const getWeekDay = (timestamp) => {
    let data = new Date(timestamp * 1000);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekDay = days[data.getDay()];

    return weekDay;
  };

  const getMonthDay = (timestamp) => {
    let data = new Date(timestamp * 1000);
    let day = data.getDate();
    let month = data.toLocaleString('en-EN', { month: 'short' });
    return `${day} ${month}`;
  };

  //get current latitude and longitude from navigator.geolocation
  const getCurrentGeolocalization = () => {
    let longitude;
    let latitude;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((myPosition) => {
        longitude = myPosition.coords.longitude;
        latitude = myPosition.coords.latitude;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  //get current weather conditions from API by using latitude and longitude
  const getCurrentOpenWeatherAPI = (latitude, longitude) => {
    const unit = "metric";
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toString()}&lon=${longitude.toString()}&units=${unit}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      let data = response.data;
      setOpenWeatherCurrentData(data);
      setCurrentDate(data.dt);
      setCurrentCity(data.name);
      setCurrentCountry(data.sys.country);
      setCurrentTemperature(Math.round(data.main.temp));
      setCurrentTempMin(Math.round(data.main.temp_min));
      setCurrentTempMax(Math.round(data.main.temp_max));
      setCurrentHumidity(data.main.humidity);
      setCurrentWeatherMain(data.weather[0].main);
      setCurrentIcon(data.weather[0].icon);
      setIsCurrentLoaded(true);
      localStorage.setItem(
        "openWeatherCurrentData",
        JSON.stringify(data)
      );
    });
  };

  //get forecast weather conditions for 7 days from API by using latitude and longitude
  const getForecastOpenWeatherAPI = (latitude, longitude) => {
    const unit = "metric";
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const exclude = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude.toString()}&lon=${longitude.toString()}&units=${unit}&exclude=${exclude}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      let data = response.data;
      setOpenWeatherForecastData(data.daily); 
      localStorage.setItem(
        "openWeatherForecastData",
        JSON.stringify(data.daily)
      );
    });
  };
 

  return (
    <OpenWeatherAPIContext.Provider
      value={{
        isCurrentLoaded,
        currentDate,
        currentCity,
        currentCountry,
        currentTemperature,
        currentTempMin,
        currentTempMax,
        currentHumidity,
        currentWeatherMain,
        currentIcon,
        currentLatitude,
        currentLongitude,
        openWeatherCurrentData,
        openWeatherForecastData,
        getWeekDay,
        getMonthDay,

      }}
    >
      {children}
    </OpenWeatherAPIContext.Provider>
  );
};

export default OpenWeatherAPIContextProvider;
