import React, { Fragment } from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import { Row, Col } from "react-bootstrap";
import "./MyLocalWeather.scss";
import DateTimestamp from "./DateTimestamp";

const MyLocalWeather = () => {
  return (
    <Fragment>
      <Row>
        <Col>
          <DateTimestamp />
        </Col>
      </Row>
      <Row className="my-local-weather">
        <Col xs={12} sm={12} md={3} lg={2}>
          <CurrentWeather />
        </Col>
        <Col xs={12} sm={12} md={9} lg={10}>
          <ForecastWeather />
        </Col>
      </Row>
    </Fragment>
  );
};

export default MyLocalWeather;
