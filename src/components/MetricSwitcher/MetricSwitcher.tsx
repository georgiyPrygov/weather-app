import { connect } from "react-redux";
import weatherOperations from "../../redux/weather/weatherOperations";
import weatherSelectors from "../../redux/weather/weatherSelectors";
import './MetricSwitcher.scss'

interface Metric {
  setMetric(val: string): string;
  metric: string;
}

const MetricSwitcher = ({ setMetric, metric }: Metric) => {
  return (
    <div className="metric-switcher">
      <button
        type="button"
        className={metric === "c" ? "active metric-btn" : "metric-btn"}
        onClick={() => setMetric("c")}
      >
        °C
      </button>
      <button
        type="button"
        className={metric === "f" ? "active metric-btn" : "metric-btn"}
        onClick={() => setMetric("f")}
      >
        °F
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
metric: weatherSelectors.getMetric(state),
});
const mapDispatchToProps = (dispatch: any) => ({
  setMetric: (val: string) => dispatch(weatherOperations.setMetric(val)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MetricSwitcher);
