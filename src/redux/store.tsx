import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherReducer";


const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
  middleware: [
    ...getDefaultMiddleware({
        serializableCheck: false
    }),
],
  devTools: process.env.NODE_ENV === "development"
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
