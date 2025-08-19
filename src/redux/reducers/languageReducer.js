import { TOGGLE_LANGUAGE } from "../actions/languageActions";
import { getLanguage } from "../../assets/translation/language";

const initialState = {
  isSwitched: false,
  isArabic: getLanguage() === "ar",
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return {
        ...state,
        isSwitched: !state.isSwitched,
        isArabic: getLanguage() === "ar",
      };
    default:
      return state;
  }
};
