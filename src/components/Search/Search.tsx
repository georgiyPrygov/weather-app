import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import weatherOperations from "../../redux/weather/weatherOperations";
import weatherApi from "../../services/weather-api";
import './Search.scss'

interface SearchData {
  setSearchResponse(data: any): any;
}

const Search = ({ setSearchResponse }: SearchData) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<any>("");
  const [error, setError] = useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(searchValue)) {
      weatherApi
        .getWeatherByCity(searchValue)
        .then((res) => {
          if (res.status === 200) {
            setSearchResponse(res.data)
            navigate(
              `/city/${res.data.name.replace(/\s/g, "-").toLowerCase()}`
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message);
          }
        });
    } else {
      weatherApi
        .getWeatherByZip(searchValue)
        .then((res) => {
          if (res.status === 200) {
            setSearchResponse(res.data)
            navigate(
              `/city/${res.data.name.replace(/\s/g, "-").toLowerCase()}`
            );
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setError("Incorrect zip code");
          }
        });
    }
  };
  return (
    <div className="search-container">
      <div className="inner-content">
        <h1 className="title">Weather</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchValue}
            placeholder="Search by city name or zip code"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit">Search</button>
        </form>
        {error !== "" && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch: any) => ({
  setSearchResponse: (data: any) =>
    dispatch(weatherOperations.setSearchResponse(data)),
});
export default connect(null, mapDispatchToProps)(Search);
