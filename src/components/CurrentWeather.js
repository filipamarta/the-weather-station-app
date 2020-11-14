import React, { useContext } from "react";
import { OpenWeatherAPIContext } from '../context/OpenWeatherAPIContext';
import './CurrentWeather.scss';

const CurrentWeather = () => {

    const {
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
      } = useContext(OpenWeatherAPIContext);
  return (
    <div>
      <h3>
        {currentCity}, {currentCountry}
      </h3>
      <p>
        coord: {currentLatitude} lat / {currentLongitude} lon
      </p>
      <p>{currentTempMin} ºC / {currentTempMax} ºC</p>
      <img
        src={`http://openweathermap.org/img/wn/${currentIcon}@2x.png`}
        alt={`icon ${currentWeatherMain}`}
      />
      <p>
        {currentWeatherMain}{/* , {currentWeatherDescription} */}
      </p>
      <p>{currentHumidity} % humidity</p>
      
    </div>
  );
};

export default CurrentWeather;
