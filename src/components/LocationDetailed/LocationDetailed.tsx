import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import weatherSelectors from "../../redux/weather/weatherSelectors";
import weatherApi from "../../services/weather-api";
import Header from "../Header/Header";
import './LocationDetailed.scss'

interface Details {
  searchResponse: any;
  metric: string;
  currentLocation: any;
}

const LocationDetailed = ({ searchResponse, metric, currentLocation }: Details) => {
  const { id = "New York" } = useParams();
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // Checks if current city is in localStorage
  const getForecast = useCallback(() => {
    const convertedId = id.replace(/-/g, " ");
    weatherApi
      .getWeatherByCity(convertedId)
      .then((res) => {
        setForecastData(res.data);
      })
      .catch((error) => {
        if (error.response) {
            setError(error.response.data.message);
          }
      });
  }, [id,setForecastData]);

  useEffect(() => {
    if (searchResponse !== null) {
      setForecastData(searchResponse);
    }
    if(currentLocation !== null && currentLocation.name.replace(/\s/g, "-").toLowerCase() === id) {
        setForecastData(currentLocation);
    } else {
        getForecast();
    }
  }, [getForecast, searchResponse, id, currentLocation]);

  return (
    <>
      <Header />
      {forecastData !== null && (
        <div className="location-detailed-container">
          <div className="main-data-block">
            <div className="city">{forecastData.name}</div>
            <div className="temperature">
              {metric === "c"
                ? `${Math.floor(forecastData.main.temp)}°`
                : `${Math.floor((forecastData.main.temp * 9) / 5 + 32)}°`}
            </div>
            <div className="temperature-image">
                <img src={`http://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`} width="80" height="80" alt="weather icon"/>
            </div>
            <div className="temperature-status">
                {forecastData.weather[0].description}
            </div>
          </div>
          <div className="details-block">
             <div className="details-item">
               <div className="title">Wind speed</div>
               <div className="descr">{forecastData.wind.speed} meter/sec</div>
             </div>
             <div className="details-item">
               <div className="title">Humidity</div>
               <div className="descr">{forecastData.main.humidity} %</div>
             </div>
             <div className="details-item">
               <div className="title">Pressure</div>
               <div className="descr">{forecastData.main.pressure} hPa</div>
             </div>
          </div>
        </div>
      )}
      {error !== "" && <div className="error-message">{error}</div>}
    </>
  );
};
const mapStateToProps = (state: any) => ({
  searchResponse: weatherSelectors.getSearchResponse(state),
  metric: weatherSelectors.getMetric(state),
  currentLocation: weatherSelectors.getWeatherData(state),
});
LocationDetailed.defaultProps = {
  searchResponse: {
    main: {
      temp: "0",
    },
  },
  metric: "c",
  currentLocation: {}
};
export default connect(mapStateToProps, null)(LocationDetailed);
