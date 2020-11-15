import { Fragment } from "react";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import OpenWeatherAPICitiesContextProvider from "./context/OpenWeatherAPICitiesContext";
import OpenWeatherAPIContextProvider from "./context/OpenWeatherAPIContext";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Fragment>
      <OpenWeatherAPIContextProvider>
        <OpenWeatherAPICitiesContextProvider>
          <Container fluid>
            <Dashboard />
          </Container>
        </OpenWeatherAPICitiesContextProvider>
      </OpenWeatherAPIContextProvider>
    </Fragment>
  );
}

export default App;
