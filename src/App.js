import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityWeather from './pages/Weather';
import Home from './pages/Home';
// import { Link } from 'react-router-dom';

const App = () => {
  // const [city,setcity]=usestate();
  return (
      <Router>
      {/* <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/city/Vadodara" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/city/Vadodara" style={{ marginRight: '1rem' }}>Vadodara</Link>
        <Link to="/city/mumbai">Mumbai</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityWeather />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CityWeather from './pages/CityWeather';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/weather/:city" element={<CityWeather />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
