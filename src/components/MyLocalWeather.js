import React from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import "./MyLocalWeather.scss";

const MyLocalWeather = () => {
  return (
    <div className="my-local-weather">
      <CurrentWeather />
      <ForecastWeather />
    </div>
  );
};

export default MyLocalWeather;
