import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import LocationDetailed from "./components/LocationDetailed/LocationDetailed";
import { Route, Routes } from "react-router";
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/city/:id" element={<LocationDetailed />} />
    </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);
