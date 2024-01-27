import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { thunk } from "redux-thunk";
import { carsReducer } from "./reducers/carsReducer";
import alertsReducer from "./reducers/alertsReducer";
import { bookingsReducer } from "./reducers/bookingReducer";

// Enhancers for Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Middleware (if any) you might use with your store
// Example: import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer
});
// Create store with enhancers
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
