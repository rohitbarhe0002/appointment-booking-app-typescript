

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appointmentReducer } from "../slices";

const rootReducer = combineReducers({
  appointments: appointmentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;