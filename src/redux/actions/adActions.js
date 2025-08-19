import { getAds, getMyAds } from "../../services/adServices";

export const TOGGLE_LOADING_ADS = "TOGGLE_LOADING_ADS";
export const GET_ADS = "GET_ADS";
export const GET_MY_ADS = "GET_MY_ADS";

export const getAdsAction = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING_ADS });
    const { data: ads } = await getAds();
    dispatch({ type: GET_ADS, payload: ads });
  };
};
export const getMyAdsAction = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING_ADS });
    const { data: ads } = await getMyAds();
    dispatch({ type: GET_MY_ADS, payload: ads });
  };
};
