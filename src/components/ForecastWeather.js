import React, {useContext} from "react";
import { OpenWeatherAPIContext } from '../context/OpenWeatherAPIContext';
import './ForecastWeather.scss';

const ForecastWeather = () => {
    const { openWeatherForecastData } = useContext(
        OpenWeatherAPIContext
      );

  return (
      <>
      <ul>
        {openWeatherForecastData.map((dailyData, i) => (
          <li key={i}>
            <p>date: {dailyData.dt}</p>
            <p>
              weather state: {dailyData.weather[0].main}, {dailyData.weather[0].description}
            </p>
            <img src={`http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`} alt={`icon ${dailyData.weather[0].main}`} />
            <p>temperature: {dailyData.temp.day} Celsius</p>
            <p>humidity: {dailyData.humidity} Celsius</p>
          </li>
          ))}
      </ul>
    </>
  );
};

export default ForecastWeather;
