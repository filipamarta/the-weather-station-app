import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const OpenWeatherAPICitiesContext = createContext();

const OpenWeatherAPICitiesContextProvider = ({ children }) => {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [citiesData, setCitiesData] = useState([] || JSON.parse(localStorage.getItem("citiesData")));
  const [isCitiesDataLoaded, setCitiesDataLoaded] = useState(false);

  useEffect(() => {
    if (city && country) {
      getCurrentOpenWeatherAPIByCityCountry(city, country);
    } else {
      console.log("Still trying to get City and Country values");
    }
  }, [city, country]);

  const deleteCity = (id) => {
    console.log(`DELETE city with id: ${id}`);
    setCitiesData(citiesData.filter((city) => city.id !== id));
  };

  const getCityCountry = (city, country) => {
    setCity(city);
    setCountry(country);
  };

  const getCurrentOpenWeatherAPIByCityCountry = (city, country) => {
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unit}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      console.log(response.data);
      let data = response.data;
      setCitiesData([
        ...citiesData,
        {
          id: uuidv4(),
          name: data.name,
          country: data.sys.country,
          date: data.dt,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          weather_main: data.weather[0].main,
          icon: data.weather[0].icon,
        },
      ]);
      setCitiesDataLoaded(true);
      localStorage.setItem(
        "citiesData",
        JSON.stringify(data)
      );
    });
  };

/*   const getForecastOpenWeatherAPIByCityCountry = (city, country) => {
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${unit}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      console.log(response.data);
    });
  }; */

/*   const getOpenWeatherAPIByCityCountry = (city, country) => {
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const unit = "metric";
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unit}&APPID=${apiKey}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${unit}&APPID=${apiKey}`;

    const reqCurrent = axios.get(urlCurrent);
    const reqForecast = axios.get(urlForecast);

    axios
      .all([reqCurrent, reqForecast])
      .then(
        axios.spread((...responses) => {
          const resCurrent = responses[0].data;
          const resForecast = responses[1].data;
          console.log("resCurrent", resCurrent);
          console.log("resForecast", resForecast);
        })
      )
      .catch((errors) => {
       console.log(errors);
      });
  }; */

  return (
    <OpenWeatherAPICitiesContext.Provider
      value={{
        isCitiesDataLoaded,
        citiesData,
        deleteCity,
        getCityCountry,
        getCurrentOpenWeatherAPIByCityCountry
      }}
    >
      {children}
    </OpenWeatherAPICitiesContext.Provider>
  );
};

export default OpenWeatherAPICitiesContextProvider;
