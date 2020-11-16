import React, { Fragment, useContext } from "react";
import SearchInput from "./SearchInput";
import MyLocalWeather from "./MyLocalWeather";
import CityWeather from "./CityWeather";
import { Row, Col, Spinner } from "react-bootstrap";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";

const Dashboard = () => {
  const { isCurrentLoaded } = useContext(OpenWeatherAPIContext);
  const { isCitiesDataLoaded, citiesData } = useContext(
    OpenWeatherAPICitiesContext
  );

  return (
    <Fragment>
      <header>
        <Row>
          <Col
            xs={12}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 6, offset: 3 }}
            className="text-center"
          >
            <h1 className="mt-4 mb-4">Weather Station</h1>
            <SearchInput />
          </Col>
        </Row>
      </header>
      {isCurrentLoaded ? (
        <Fragment>
          <section>
            <Row>
              <Col xs={12}>
                <MyLocalWeather />
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
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="dark">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
