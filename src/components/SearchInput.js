import React, { Fragment, useState, useContext } from "react";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";
import { Form, Col, Button } from "react-bootstrap";

const SearchInput = () => {
  const [cityInput, setCityInput] = useState();
  const [countryInput, setCountryInput] = useState();
  const [isFormError, setIsFormError] = useState(false);
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
      setIsFormError(false);
      setCityInput("");
      setCountryInput("");
    } else {
      setIsFormError(true);
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
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
          <Col>
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
          <Col lg={3}>
            <Button type="submit">Get Weather</Button>
          </Col>
        </Form.Row>
      </Form>
      {isFormError ? (
        <p className="text-left text-muted">Don't forget to fill in both fields </p>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default SearchInput;
