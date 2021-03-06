import React, { useContext } from "react";
import "./CityWeather.scss";
import { Button } from "react-bootstrap";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";

const CityWeather = ({ city }) => {
  const { deleteCity } = useContext(OpenWeatherAPICitiesContext);

  return (
    <li className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="city-weather text-center">
        <Button
          className="delete-btn"
          type="button"
          name="delete"
          onClick={() => {
            deleteCity(city.name);
          }}
        ></Button>
        <h2 className="mt-4">
          {city.name}, {city.country}
        </h2>
        <h3 className="mt-4">{Math.round(city.temp)} ºC</h3>
        <p className="mt-2 mb-2">
          {Math.round(city.temp_min)} ºC /{" "}
          <span>{Math.round(city.temp_max)} ºC</span>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
          alt={`icon ${city.weather_main}`}
        />
        <p>
          {city.weather_main} <br /> {city.humidity} % humidity
        </p>
      </div>
    </li>
  );
};

export default CityWeather;
