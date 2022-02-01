import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import MetricSwitcher from "../MetricSwitcher/MetricSwitcher";
import "./Header.scss";

const Header = () => {
  const { id = "New York" } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [convertedId, setConvertedId] = useState("");

  // Checks if current city is in localStorage
  const checkIfInLocalStorage = useCallback(() => {
    setConvertedId(id.replace(/-/g, " "));
    let cities = [];
    cities = JSON.parse(localStorage.getItem("cities") as string) || [];
    if (cities.includes(convertedId)) {
      setIsSaved(true);
    }
  }, [id, convertedId]);

  useEffect(() => {
    checkIfInLocalStorage();
  }, [checkIfInLocalStorage]);

  // Saves current city in local storage
  const saveLocation = () => {
    let cities = [];
    cities = JSON.parse(localStorage.getItem("cities") as string) || [];
    if (!isSaved) {
      cities.push(convertedId);
      localStorage.setItem("cities", JSON.stringify(cities));
      setIsSaved(true);
    }
  };
  return (
    <header className="header-container full-width-container">
      <div className="inner-content">
        <div className="header-content">
          <MetricSwitcher />
          {window.location.href.indexOf("city") !== -1 && (
            <div className="actions-container">
              <Link to="/" className="transparent-btn back">
                ← Back to list
              </Link>
              {!isSaved && (
                <button
                  type="button"
                  className="transparent-btn"
                  onClick={() => saveLocation()}
                >
                  <b>Save city</b>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
