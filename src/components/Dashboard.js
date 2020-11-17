import React, { Fragment, useContext } from "react";
import SearchInput from "./SearchInput";
import MyLocalWeather from "./MyLocalWeather";
import CityWeather from "./CityWeather";
import { Row, Col, Spinner } from "react-bootstrap";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";
import { OpenWeatherAPICitiesContext } from "../context/OpenWeatherAPICitiesContext";

const Dashboard = () => {
  const { isCurrentLoaded } = useContext(OpenWeatherAPIContext);
  const { citiesData } = useContext(OpenWeatherAPICitiesContext);

  return (
    <Fragment>
      <header>
        <Row>
          <Col
            xs={12}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            className="text-center"
          >
            <h1 className="mt-0 mb-0">Weather Station</h1>
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
              <Col
                xs={12}
                sm={{ span: 12, offset: 0 }}
                md={{ span: 8, offset: 2 }}
                lg={{ span: 6, offset: 3 }}
                className="text-center mt-5 mb-5"
              >
                <SearchInput />
              </Col>
            </Row>
          </section>
          <section>
            <ul className="row cities-list">
              {citiesData.map((city) => (
                <CityWeather key={city.id} city={city} />
              ))}
            </ul>
          </section>
        </Fragment>
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="dark">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Loading your local weather...</p>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
