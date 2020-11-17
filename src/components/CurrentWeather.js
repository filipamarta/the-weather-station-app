import React, { useContext } from "react";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import "./CurrentWeather.scss";

const CurrentWeather = () => {
  const {
    currentCity,
    currentCountry,
    currentTemperature,
    currentTempMin,
    currentTempMax,
    currentWeatherMain,
    currentIcon,
    currentHumidity,
  } = useContext(OpenWeatherAPIContext);

  return (
    <div className="current-weather text-center">
      <h2>
        {currentCity}, {currentCountry}
      </h2>
      <h3 className="mt-4">{currentTemperature} ºC</h3>
      <p className="mt-2 mb-2">
        {currentTempMin} ºC / <span>{currentTempMax} ºC</span>
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${currentIcon}@2x.png`}
        alt={`icon ${currentWeatherMain}`}
      />
      <p className="mb-0">
        {currentWeatherMain} <br />
        {currentHumidity} % humidity
      </p>
    </div>
  );
};

export default CurrentWeather;
