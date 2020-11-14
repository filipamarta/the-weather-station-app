import React, {useContext} from "react";
import { OpenWeatherAPIContext } from '../context/OpenWeatherAPIContext';
import './ForecastWeather.scss';

const ForecastWeather = () => {
    const { openWeatherForecastData } = useContext(
        OpenWeatherAPIContext
      );

  return (
      <>
      <ul className="forecast-list">
        {openWeatherForecastData.map((dailyData, i) => (
          <li key={i}>
            <p>date: {dailyData.dt}</p>
            <p>{Math.round(dailyData.temp.min)} ºC / {Math.round(dailyData.temp.max)} ºC</p>
            <img src={`http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`} alt={`icon ${dailyData.weather[0].main}`} />
            <p>
               {dailyData.weather[0].main}{/* , {dailyData.weather[0].description} */}
            </p>
            
            
            <p>{dailyData.humidity} % humidity</p>
          </li>
          ))}
      </ul>
    </>
  );
};

export default ForecastWeather;
