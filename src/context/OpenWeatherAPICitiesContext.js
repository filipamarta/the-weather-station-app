import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const OpenWeatherAPICitiesContext = createContext();

const OpenWeatherAPICitiesContextProvider = ({ children }) => {
  const [cityCountry, setcityCountry] = useState(
    JSON.parse(localStorage.getItem("cityCountry")) || []
  );
  const [cityCountryError, setCityCountryError] = useState("");
  const [citiesData, setCitiesData] = useState(
    JSON.parse(localStorage.getItem("citiesData")) || []
  );
  const [isCitiesDataLoaded, setCitiesDataLoaded] = useState(false);

  useEffect(() => {
    if (cityCountry) {
      cityCountry.forEach((element) =>
        //iterate through object "cityCountry" and call API for each city that the user "save" as favourite
        getCurrentOpenWeatherAPIByCityCountry(element.city, element.country)
      );
    } else {
      console.log("Still trying to get City and Country values");
    }
  }, [cityCountry]);

  useEffect(() => {
    localStorage.setItem("citiesData", JSON.stringify(citiesData));
  }, [citiesData, cityCountry]);

  useEffect(() => {
    localStorage.setItem("cityCountry", JSON.stringify(cityCountry));
  }, ["cityCountry", cityCountry]);

  const deleteCity = (id) => {
    console.log(`DELETE city with id: ${id}`);
    let updateCitiesData = citiesData.filter((city) => {
      console.log(city);
      return city.id !== id;
    });
    setCitiesData(updateCitiesData);
  };

  const addCityCountry = (city, country) => {
    //get city and country input values and save them in a single object "cityCountry"
    let isCityCountryOnTheList = cityCountry.some(
      (cityCountry) => cityCountry.city === city && cityCountry.country === country
    );
    if (!isCityCountryOnTheList) {
      setcityCountry([
        ...cityCountry,
        { id: uuidv4(), city: city, country: country },
      ]);
      localStorage.setItem("cityCountry", JSON.stringify(cityCountry));
    } else {
      setCityCountryError(`City ${city} is already on the list`)
    }
  };

  const getCurrentOpenWeatherAPIByCityCountry = (city, country) => {
    const apiKey = "8067b732142668fa0cee5b9830a0a802";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unit}&APPID=${apiKey}`;

    axios.get(url).then((response) => {
      let data = response.data;
      //get API data and save it in an array of data but first check if the selected city is already on the list
      let isCityDataOnTheList = citiesData.some(
        (cityData) => cityData.name === data.name
      );
      if (!isCityDataOnTheList) {
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
            humidity: data.main.humidity,
            weather_main: data.weather[0].main,
            icon: data.weather[0].icon,
          },
        ]);
        setCitiesDataLoaded(true);
      } else {
        console.log(`City ${data.name} was already on the list`);
      }
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
        addCityCountry,
        getCurrentOpenWeatherAPIByCityCountry,
      }}
    >
      {children}
    </OpenWeatherAPICitiesContext.Provider>
  );
};

export default OpenWeatherAPICitiesContextProvider;
