
const getWeatherData = (state:any) => state.weather.weatherData.currentLocation;
const getIsTrackAllowed = (state:any) => state.weather.weatherData.isTrackAllowed
const getMetric = (state:any) => state.weather.weatherData.metric;
const getSearchResponse = (state:any) => state.weather.weatherData.searchResponse;

  
  export default {
    getWeatherData,
    getIsTrackAllowed,
    getMetric,
    getSearchResponse
  };
  