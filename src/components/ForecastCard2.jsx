import React from 'react';

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt * 1000).toLocaleDateString('en-IN', { weekday: 'long' });

  return (
    <div className="forecast-card">
      <p>{date}</p>
      <p>{data.weather[0].Date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
      <p>{Math.round(data.main.temp)}°C</p>
      <p>{data.weather[0].main}</p>
    </div>
  );
};

export default ForecastCard;