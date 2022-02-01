import { combineReducers, createReducer } from "@reduxjs/toolkit";
import actions from "./weatherActions";

const initialState = {
  currentLocation: null,
  isTrackAllowed: false,
  metric: 'c',
  searchResponse: null
};

const weatherData = createReducer(initialState, {
 [actions.setWeatherData.type] : (state, { payload }) => ({
    ...state,
    currentLocation: payload,
  }),
  [actions.setIsTrackAllowed.type] : (state, { payload }) => ({
    ...state,
    isTrackAllowed: payload,
  }),
  [actions.setMetric.type] : (state, { payload }) => ({
    ...state,
    metric: payload,
  }),
  [actions.setSearchResponse.type] : (state, { payload }) => ({
    ...state,
    searchResponse: payload,
  }),
});

export default combineReducers({
    weatherData,
});
 