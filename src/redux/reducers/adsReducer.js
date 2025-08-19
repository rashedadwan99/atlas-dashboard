import { GET_ADS, GET_MY_ADS } from "../actions/adActions";
import { TOGGLE_LOADING_ADS } from "../actions/adActions";

const initialState = {
  isLoading: false,
  allAds: [],
  myAds: [],
};
export const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_ADS:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case GET_ADS:
      return {
        ...state,
        allAds: action.payload,
        isLoading: false,
      };
    case GET_MY_ADS:
      return { ...state, myAds: action.payload, isLoading: false };
    default:
      return state;
  }
};
