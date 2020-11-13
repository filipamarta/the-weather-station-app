import React, { useContext } from "react";
import { OpenWeatherAPIContext } from '../context/OpenWeatherAPIContext';
import './CurrentWeather.scss';

const CurrentWeather = () => {

    const {
        currentDate,
        currentCity,
        currentCountry,
        currentTemperature,
        currentHumidity,
        currentWeatherMain,
        currentWeatherDescription,
        currentIcon,
        currentLatitude,
        currentLongitude,
      } = useContext(OpenWeatherAPIContext);
  return (
    <div>
    <img
        src={`http://openweathermap.org/img/wn/${currentIcon}@2x.png`}
        alt={`icon ${currentWeatherMain}`}
      />
      <h3>
        {currentCity}, {currentCountry}
      </h3>
      <p>
        weather state: {currentWeatherMain}, {currentWeatherDescription}
      </p>

      <p>temperature: {currentTemperature} Celsius</p>
      <p>humidity: {currentHumidity} Celsius</p>
      <p>
        coord: {currentLatitude} lat / {currentLongitude} lon
      </p>
    </div>
  );
};

export default CurrentWeather;
