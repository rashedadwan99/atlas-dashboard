import { applyMiddleware, compose, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  {},
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
