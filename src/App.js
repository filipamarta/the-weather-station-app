import "./App.scss";
import Dashboard from "./components/Dashboard";
import OpenWeatherAPIContextProvider from "./context/OpenWeatherAPIContext";

function App() {
  return <div>
    <OpenWeatherAPIContextProvider>
      <Dashboard />
    </OpenWeatherAPIContextProvider>
  </div>;
}

export default App;
