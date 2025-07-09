import React, { useEffect, useState} from 'react';
import { useParams,useNavigate} from 'react-router-dom';

import { fetchCurrentWeather, fetchForecast } from '../services/weatherAPI';
import ForecastCard from '../components/ForecastCard';
import ForecastCard2 from '../components/ForecastCard2';
import '../App.css'; 

const Weather = () => {
    const { city2 } = useParams();
  const navigate = useNavigate();

  const defaultCities = ['Vadodara', 'Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Chennai', 'Jaipur','Tokyo','New York','Dubai'];
  const [city, setCity] = useState(city2 || 'Vadodara');
  const [searchInput, setSearchInput] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecastToday, setForecastToday] = useState([]);
  const [forecastDaily, setForecastDaily] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDark, setIsDark] = useState(true); 
  const [cityList, setCityList] = useState(defaultCities);

  useEffect(() => {
    document.body.className = isDark ?'light-theme':'dark-theme';
  }, [isDark]);

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 const handleCitySelect = (selectedCity) => {
  navigate(`/city/${selectedCity}`); 
   setCity(selectedCity.trim());
   setSearchInput(selectedCity.trim())
};
useEffect(() => {
  const loadWeather = async () => {
    try {
      const curr = await fetchCurrentWeather(city);
      const fore = await fetchForecast(city);
      const allList = fore.data.list;

      const todayStr = new Date().toDateString();
      const todayList = allList.filter(
        (item) => new Date(item.dt_txt).toDateString() === todayStr
      );
      const dailyList = allList.filter((_, i) => i % 8 === 0);

      setCurrent(curr.data);
      setForecastToday(todayList);
      setForecastDaily(dailyList);
    } catch (err) {
      console.error('Error loading weather:', err);
    }
  };
  if (city) {
    loadWeather();
  }
}, [city]);

 const handleSearch = (e) => {
  e.preventDefault();
  const trimmed = searchInput.trim();
  if (trimmed !== '') {
    if (!cityList.includes(trimmed)) {
      setCityList(prev => [...prev, trimmed]);
    }
    setCity(trimmed);
    navigate(`/city/${trimmed}`);
  }
};


//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() !== '') {
//       setCity(searchInput.trim());
//     }
//   };
 
  const formatDate = () => {
    const date = new Date();
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
  };
  




  return (
    <div className="weather-wrapper">
      <nav style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  background: '#004080',
  color: 'white',
  padding: '10px 20px',
  marginBottom: '10px',
  borderRadius: '6px'
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
    <h2 style={{ margin: 0, fontSize: '20px' }}>Weather App</h2>
  </div>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'flex-start'
  }}>
    {cityList.map((cityName, i) => (
      <button
        key={i}
        className="search-btn"
        style={{
          backgroundColor: '#3399ff',
          padding: '10px',
          width: '100px',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'center'
        }}
        onClick={() => handleCitySelect(cityName)}
      >
        {cityName}
      </button>
    ))}
  </div>
</nav>


     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
  <button
    onClick={() => setIsDark(!isDark)}
    className="search-btn"
    aria-label="Toggle Theme"
  >
    {isDark ? '🌙 Dark Mode ' : '☀ Light Mode'}
  </button>

  
</div>


     
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          aria-label="Search city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search city..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      
      <div className={`weather-layout ${isMobile ? 'mobile' : ''}`}>
        
        <div className={`weather-left ${isMobile ? 'mobile' : ''}`}>
          {current && (
            <div className="card">
              <h2>{city.toUpperCase()}, {current.sys.country}</h2>
              <p className="weather-description">{formatDate()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                alt={current.weather[0].description}
                className="weather-icon"
              />
              <h1 className="weather-temp">{Math.round(current.main.temp)}°C</h1>
              <p className="weather-description">{current.weather[0].description}</p>
            </div>
          )}

          {current && (
            <div className="card air-conditions">
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
              />
              <h3>Air Conditions</h3>
              <div className="air-grid">
                <div className="air-box">
                  <i className="fas fa-temperature-high air-icon"></i>
                  <p><strong>Real Feel:</strong> {Math.round(current.main.feels_like)}°C</p>
                </div>
                <div className="air-box">
                  <i className="fas fa-wind air-icon"></i>
                  <p><strong>Wind:</strong> {current.wind.speed} m/s</p>
                </div>
                <div className="air-box">
                  <i className="fas fa-cloud air-icon"></i>
                  <p><strong>Clouds:</strong> {current.clouds.all}%</p>
                </div>
                <div className="air-box">
                  <i className="fas fa-droplet air-icon"></i>
                  <p><strong>Humidity:</strong> {current.main.humidity}%</p>
                </div>
              </div>
            </div>
          )}

          <div className="today-forecast">
            <h3>Today's Forecast</h3>
            <div className="today-forecast-scroll">
              {forecastToday.map((item, idx) => (
                <ForecastCard key={idx} data={item} />
              ))}
            </div>
          </div>
        </div>

      
        <div className={`weather-right ${isMobile ? 'mobile' : ''}`}>
          <h3>Weekly Forecast</h3>
          <div className="weekly-forecast">
            {forecastDaily.map((item, idx) => (
              <ForecastCard2 key={idx} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
