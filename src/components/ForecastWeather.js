import React, { useContext } from "react";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import "./ForecastWeather.scss";

const ForecastWeather = () => {
  const { openWeatherForecastData } = useContext(OpenWeatherAPIContext);

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
