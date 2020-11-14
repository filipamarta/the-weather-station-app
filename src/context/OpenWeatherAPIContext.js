import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const OpenWeatherAPIContext = createContext();

const OpenWeatherAPIContextProvider = ({ children }) => {
  //latitude and longitude
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  //current weather conditions
  const [openWeatherCurrentData, setOpenWeatherCurrentData] = useState(
    [] || JSON.parse(localStorage.getItem("openWeatherCurrentData"))
  );
  const [currentDate, setCurrentDate] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [currentTempMin, setCurrentTempMin] = useState("");
  const [currentTempMax, setCurrentTempMax] = useState("");
  const [currentHumidity, setCurrentHumidity] = useState("");
  const [currentWeatherMain, setCurrentWeatherMain] = useState("");
  const [currentWeatherDescription, setCurrentWeatherDescription] = useState(
    ""
  );
  const [currentIcon, setCurrentIcon] = useState("");
  //forecast weather conditions
  const [openWeatherForecastData, setOpenWeatherForecastData] = useState(
    [] || JSON.parse(localStorage.getItem("openWeatherForecastData"))
  );

  useEffect(() => {
    getCurrentGeolocalization();
  }, [currentLatitude]);

  useEffect(() => {
    getCurrentOpenWeatherAPI(currentLatitude, currentLongitude);
  }, [currentLatitude, currentLongitude]);

  useEffect(() => {
    getForecastOpenWeatherAPI(currentLatitude, currentLongitude);
  }, [currentLatitude, currentLongitude]);

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
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toString()}&lon=${longitude.toString()}&units=${units}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      console.log(response.data)
      setOpenWeatherCurrentData(response.data);
      setCurrentDate(response.data.dt);
      setCurrentCity(response.data.name);
      setCurrentCountry(response.data.sys.country);
      setCurrentTemperature(Math.round(response.data.main.temp));
      setCurrentTempMin(Math.round(response.data.main.temp_min));
      setCurrentTempMax(Math.round(response.data.main.temp_max));
      setCurrentHumidity(response.data.main.humidity);
      setCurrentWeatherMain(response.data.weather[0].main);
      setCurrentWeatherDescription(response.data.weather[0].description);
      setCurrentIcon(response.data.weather[0].icon);
      localStorage.setItem(
        "openWeatherCurrentData",
        JSON.stringify(response.data)
      );
    });
  };

  //get forecast weather conditions for 7 days from API by using latitude and longitude
  const getForecastOpenWeatherAPI = (latitude, longitude) => {
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const units = "metric";
    const exclude = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude.toString()}&lon=${longitude.toString()}&units=${units}&exclude=${exclude}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      console.log(response.data.daily);
      setOpenWeatherForecastData(response.data.daily);

      localStorage.setItem(
        "openWeatherForecastData",
        JSON.stringify(response.data.daily)
      );
    });
  };

  /*   const getDay = () => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var dayNum = new Date(currentDate * 1000).getDay();
    var result = days[dayNum];
    console.log(result);

    let today = new Date();
    let dateDay = Date.getDay();
    let dateNow = Date.now();
    let dateTime = new Date(currentDate * 1000);
    let hours = dateTime.getHours();
    let minutes = "0" + dateTime.getMinutes();
    let seconds = "0" + dateTime.getSeconds();
    // Display time in 00:00:00 format
    let formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    let [hour, minute, second] = new Date()
      .toLocaleTimeString("en-US")
      .split(/:| /);
  }; */

  return (
    <OpenWeatherAPIContext.Provider
      value={{
        currentDate,
        currentCity,
        currentCountry,
        currentTemperature,
        currentTempMin,
        currentTempMax,
        currentHumidity,
        currentWeatherMain,
        currentWeatherDescription,
        currentIcon,
        currentLatitude,
        currentLongitude,
        openWeatherCurrentData,
        openWeatherForecastData,
      }}
    >
      {children}
    </OpenWeatherAPIContext.Provider>
  );
};

export default OpenWeatherAPIContextProvider;
