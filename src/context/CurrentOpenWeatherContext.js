import React, { createContext } from 'react';
import axios from 'axios';

export const CurrentOpenWeatherContext = createContext();

const CurrentOpenWeatherContextProvider = ({children}) => {

    return (
        <CurrentOpenWeatherContext.Provider value={{}}>
            {children}
        </CurrentOpenWeatherContext.Provider>
    )
}

export default CurrentOpenWeatherContextProvider;