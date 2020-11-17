import React, { Fragment, useState, useContext } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";
import "./SearchInput.scss";

const SearchInput = () => {
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const {
    citiesData,
    cityCountry,
    cityCountryError,
    addCityCountry,
  } = useContext(OpenWeatherAPICitiesContext);

  const handleInputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    name === "cityInput" ? setCityInput(value) : setCountryInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cityInput.length > 0 && countryInput.length > 0) {
      addCityCountry(cityInput, countryInput);
      setIsFormError(false);
      setCityInput("");
      setCountryInput("");
    } else {
      setIsFormError(true);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <p className="text-left">
            Search for other cities weather. Are you curious?
          </p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Form.Group controlId="addCityInput">
              <Form.Control
                type="text"
                placeholder="City"
                name="cityInput"
                autoComplete="off"
                value={cityInput}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Form.Group controlId="addCountryInput">
              <Form.Control
                type="text"
                placeholder="Country"
                name="countryInput"
                autoComplete="off"
                value={countryInput}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Button type="submit">Get Weather</Button>
          </Col>
        </Form.Row>
      </Form>
      {cityCountry.length === 0 ? (
        <p className="text-left text-muted">Your list is empty</p>
      ) : cityCountryError ? (
        <p className="text-left text-muted">{cityCountryError}</p>
      ) : (
        ""
      )}

      {isFormError ? (
        <p className="text-left text-muted">
          Don't forget to fill in both fields{" "}
        </p>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default SearchInput;
