import { useState } from 'react'
import axios from 'axios'


function App() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const getData = async () => {
    setPage(2);
    try {
      const resLoc = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.split(' ').join('_')},IN&limit=5&appid=${import.meta.env.VITE_API_BASE_URL}`);      const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${resLoc.data[0].lat}&lon=${resLoc.data[0].lon}&appid=${import.meta.env.VITE_API_BASE_URL}`);      setWeather(res.data);
      setPage(3);
    } catch (error) {
      setPage(4);
      console.log(error); 
    }
  }
  if (page === 1) {
    return (
      <div className='container'>
        <label>Enter Your City</label>
        <br />
        <input type="text" value={city} onChange={(e) => {
          setCity(e.target.value);
        }} />
        <button onClick={getData}>Search</button>
      </div>
    )
  } else if (page === 2) {
    return (
      <div className='container'>
        loading...
      </div>
    )
  } else if (page === 3) {
    return (
      <div className='container'>
        <div className="sub--container">
          <div className="image">
            {weather.weather[0].main}
          </div>
          <div className="temp">
            {Math.round(weather.main.temp-273)}°C
          </div>
          <div className="extra">
            <div className="line">
              WindSpeed: {weather.wind.speed} km/h {weather.wind.deg}°N
            </div>
            <div className="line">
              Humidity: {weather.main.humidity}%
            </div>
            <div className="line">
              Pressure: {weather.main.pressure}hPa
            </div>
          </div>
        </div>
      </div>
    )
  } else if(page == 4){
    return (
      <div className='container'>
        <div className="sub--container">
          <div className="image">
            City Not Found
          </div>
        </div>
      </div>
    )
  }
}

export default App
