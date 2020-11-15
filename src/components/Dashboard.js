import React, { Fragment, useContext } from "react";
import SearchInput from "./SearchInput";
import MyLocalWeather from "./MyLocalWeather";
import CityWeather from "./CityWeather";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const { isCurrentLoaded } = useContext(OpenWeatherAPIContext);
  const { isCitiesDataLoaded, citiesData } = useContext(OpenWeatherAPICitiesContext);

  return (
    <Fragment>
      <header>
        <Row>
          <Col xs={12} className="text-center">
            <h1 className="mt-4 mb-4">Weather Station</h1>
            <SearchInput />
          </Col>
        </Row>
      </header>
      <section>
        <Row>
          <Col xs={12}>
            {isCurrentLoaded ? <MyLocalWeather /> : <p>Loading...</p>}
          </Col>
        </Row>
      </section>
      <section>
        <Row>
          <Col xs={12}>
            {isCitiesDataLoaded ? (
              <ul className="cities-list">
                {citiesData.map((city, id) => (
                  <CityWeather key={id} city={city} />
                ))}
              </ul>
            ) : (
              <p>Select other city weather</p>
            )}
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default Dashboard;
