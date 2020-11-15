import React, { Fragment, useState, useContext } from "react";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";

const SearchInput = () => {
  const [cityInput, setCityInput] = useState();
  const [countryInput, setCountryInput] = useState();
  const [isInputError, setIsInputError] = useState(false);
  const { getCityCountry } = useContext(OpenWeatherAPICitiesContext);

  const handleInputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    name === "cityInput" ? setCityInput(value) : setCountryInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cityInput.length > 0 && countryInput.length > 0) {
      getCityCountry(cityInput, countryInput);
      setIsInputError(false);
      setCityInput("");
      setCountryInput("");
    } else {
      setIsInputError(true);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          name="cityInput"
          autoComplete="off"
          value={cityInput}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="countryInput"
          autoComplete="off"
          value={countryInput}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {isInputError ? <p>Don't forget to fill in both fields </p> : ""}
    </Fragment>
  );
};

export default SearchInput;
