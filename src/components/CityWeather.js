import React, {useContext} from "react";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";
import "./CityWeather.scss";


const CityWeather = ({ city }) => {
  const { deleteCity } = useContext(OpenWeatherAPICitiesContext);
  
  return (
    <li className="favourite-city">
      <button
        className="delete-btn"
        type="button"
        name="delete"
        onClick={() => {
          deleteCity(city.id);
        }}
      >
        Delete
      </button>
      <h3>
        {city.name}, {city.country}
      </h3>
      <p>
        {Math.round(city.temp_min)} ºC / {Math.round(city.temp_max)} ºC
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
        alt={`icon ${city.weather_main}`}
      />
      <p>{city.weather_main}</p>
    </li>
  );
};

export default CityWeather;
