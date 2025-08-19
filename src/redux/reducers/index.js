import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { userReducer } from "./userReducer";
import { generalDataReducer } from "./generalDataReducer";
import { adsReducer } from "./adsReducer";

export const rootReducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  generalData: generalDataReducer,
  ads: adsReducer,
});
