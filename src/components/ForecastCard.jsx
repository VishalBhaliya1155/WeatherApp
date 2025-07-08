
import React from 'react';

const ForecastCard = ({ data }) => {
  const time = new Date(data.dt_txt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

//   const condition = data.weather[0].main;
  const temperature = data.main.temp.toFixed(1); 

  return (
    <div className="forecast-card">
      <p className="forecast-time">{time}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
      {/* <p className="forecast-condition">{condition}</p> */}
      <p className="forecast-temp">{temperature}°C</p>
    </div>
  );
};

export default ForecastCard;

