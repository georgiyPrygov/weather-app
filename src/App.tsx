import weatherApi from "./services/weather-api";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import weatherOperations from "./redux/weather/weatherOperations";
import Header from "./components/Header/Header";
import LocationsList from "./components/LocationsList/LocationsList";
import Loader from "./components/Loader/Loader";
import weatherSelectors from "./redux/weather/weatherSelectors";

interface weatherData {
  setWeatherData(data: any): any;
  setIsTrackAllowed(val: boolean): boolean;
  currentLocation: any;
}

function App({
  setWeatherData,
  setIsTrackAllowed,
  currentLocation
}: weatherData) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const error = useCallback(
    (err: any) => {
      setIsTrackAllowed(false);
      setIsLoading(false);
    },
    [setIsTrackAllowed]
  );

  const locationSuccess = useCallback(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      weatherApi
        .getWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        )
        .then((res) => {
          setWeatherData(res);
          setIsTrackAllowed(true);
        })
        .then(() => setIsLoading(false));
    }, error);
  },[setWeatherData,setIsTrackAllowed, setIsLoading, error]);

  useEffect(() => {
    if (currentLocation === null) {
      locationSuccess();
    }
  }, [currentLocation, locationSuccess]);
  return (
    <div className="App">
      {isLoading && currentLocation === null ? (
        <Loader />
      ) : (
        <>
          <Header />
          <LocationsList />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  currentLocation: weatherSelectors.getWeatherData(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setWeatherData: (data: any) =>
    dispatch(weatherOperations.setWeatherData(data)),
  setIsTrackAllowed: (val: boolean) =>
    dispatch(weatherOperations.setIsTrackAllowed(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
