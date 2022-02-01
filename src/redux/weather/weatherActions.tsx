import { createAction } from '@reduxjs/toolkit';


const setWeatherData = createAction<any>('weather/setWeatherData');
const setIsTrackAllowed = createAction<boolean>('weather/setIsTrackAllowed');
const setMetric = createAction<string>('weather/setMetric');
const setSearchResponse = createAction<string>('weather/setSearchResponse');




export default {
    setWeatherData,
    setIsTrackAllowed,
    setMetric,
    setSearchResponse
}