import React, { useContext } from "react";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import "./ForecastWeather.scss";

const ForecastWeather = () => {
  const { getWeekDay, getMonthDay, openWeatherForecastData } = useContext(OpenWeatherAPIContext);

  return (
    <>
      <ul className="forecast-list">
        {openWeatherForecastData.map((dailyData, i) =>
          i === 0 ? (
            ""
          ) : (
            <li key={i}>
              <p>{getWeekDay(dailyData.dt)}, <br /> {getMonthDay(dailyData.dt)}</p>
              <h6 className="mt-2 mb-2">
                {Math.round(dailyData.temp.min)} ºC /{" "}
                <span>{Math.round(dailyData.temp.max)} ºC</span>
              </h6>
              <img
                src={`http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`}
                alt={`icon ${dailyData.weather[0].main}`}
              />
              <p>
                {dailyData.weather[0].main} <br /> {dailyData.humidity} % humidity
              </p>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default ForecastWeather;
