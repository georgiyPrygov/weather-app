import axios from "axios";

const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";

const getWeatherByLocation = (lat:number,lon:number) => {
  return axios
    .get(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then((res) => res.data)
    .catch((error) => error);
};
const getWeatherByCity = (city:string) => {
    return axios
      .get(`${BASE_URL}?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res)
  };

  const getWeatherByZip = (zip:number) => {
    return axios
      .get(`${BASE_URL}?zip=${zip}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res)
  };

export default { getWeatherByLocation, getWeatherByCity, getWeatherByZip };
