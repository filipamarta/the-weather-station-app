import React from 'react';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';

const Dashboard = () => {
    return ( <div>
        <h1>The Weather Station</h1>
        <CurrentWeather />
        <ForecastWeather />
    </div> );
}
 
export default Dashboard;