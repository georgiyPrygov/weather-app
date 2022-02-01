import weatherActions from "./weatherActions";
import type { RootState, AppDispatch } from '../store'
import { Dispatch } from "redux";

interface weatherData {
    data: any
}

const setWeatherData = (data:weatherData) => (dispatch: Dispatch) => {
      dispatch(weatherActions.setWeatherData(data));
}
const setIsTrackAllowed = (state:boolean) => (dispatch: Dispatch) => {
    dispatch(weatherActions.setIsTrackAllowed(state))
}
const setMetric = (metric:string) => (dispatch: Dispatch) => {
    dispatch(weatherActions.setMetric(metric))
}
const setSearchResponse = (data:any) => (dispatch: Dispatch) => {
    dispatch(weatherActions.setSearchResponse(data))
}
export default {
    setWeatherData,
    setIsTrackAllowed,
    setMetric,
    setSearchResponse
}