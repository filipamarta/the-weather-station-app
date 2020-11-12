import "./App.scss";
import Dashboard from "./components/Dashboard";
import CurrentOpenWeatherContextProvider from "./context/CurrentOpenWeatherContext";

function App() {
  return <div>
    <CurrentOpenWeatherContextProvider>
      <Dashboard />
    </CurrentOpenWeatherContextProvider>
  </div>;
}

export default App;
