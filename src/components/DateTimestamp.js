import React, { useContext } from "react";
import { OpenWeatherAPIContext } from "../context/OpenWeatherAPIContext";

const DateTimestamp = () => {
  const { currentDate, getWeekDay, getMonthDay } = useContext(
    OpenWeatherAPIContext
  );

  return (
    <h6 className="text-center mt-2">
      Today: {getWeekDay(currentDate)}, {getMonthDay(currentDate)}
    </h6>
  );
};

export default DateTimestamp;
