import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import weatherOperations from "../../redux/weather/weatherOperations";
import weatherSelectors from "../../redux/weather/weatherSelectors";
import Search from "../Search/Search";
import "./LocationsList.scss";

interface List {
  currentLocation: any;
  metric: string;
  setSearchResponse(data: any): any;
}

const LocationsList = ({ currentLocation, metric, setSearchResponse}: List) => {
  const [citiesList, setCitiesList] = useState([]);

  // check if there are saved cities in local storage
  const checkForSavedCities = useCallback(() => {
    let cities = [];
    cities = JSON.parse(localStorage.getItem("cities") as string) || [];
    if (cities.length !== 0) {
      if (currentLocation !== null) {
        const filteredCities = cities.filter(
          (item: string) => item !== currentLocation.name.toLowerCase()
        );
        setCitiesList(filteredCities);
      } else {
        setCitiesList(cities);
      }
    }
  },[currentLocation]);

  useEffect(() => {
    checkForSavedCities();
    setSearchResponse(null);
  }, [checkForSavedCities, setSearchResponse]);

  return (
    <div className="search-list-container">
      <Search />
      <div className="locations-list">
        {currentLocation !== null && (
          <>
            <h3 className="subtitle">Current location</h3>
            <div className="locations-items">
              <Link
                to={`/city/${currentLocation.name
                  .replace(/\s/g, "-")
                  .toLowerCase()}`}
              >
                {currentLocation.name}
                <span className="current-loc-temp">
                  {metric === "c"
                    ? `${Math.floor(currentLocation.main.temp)}°`
                    : `${Math.floor(
                        (currentLocation.main.temp * 9) / 5 + 32
                      )}°`}
                </span>
              </Link>
            </div>
          </>
        )}
        {citiesList.length !== 0 && (
          <>
            <h3 className="subtitle">Saved locations</h3>
            <div className="locations-items saved">
              {citiesList.map((item: string) => {
                return (
                  <Link
                    to={`/city/${item.replace(/\s/g, "-").toLowerCase()}`}
                    key={item}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </>
        )}
        {citiesList.length === 0 && currentLocation === null && (
          <div className="first-searh">
            Welcome. Use search field, to get weather forecast for your city
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentLocation: weatherSelectors.getWeatherData(state),
  metric: weatherSelectors.getMetric(state),
});
const mapDispatchToProps = (dispatch: any) => ({
  setSearchResponse: (data: any) =>
    dispatch(weatherOperations.setSearchResponse(data)),
});
LocationsList.defaultProps = {
  currentLocation: {},
  metric: "c",
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
