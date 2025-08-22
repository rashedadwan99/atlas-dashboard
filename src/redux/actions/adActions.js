import {
  getPendingAds,
  getMyAds,
  getApprovedAds,
} from "../../services/adServices";

export const TOGGLE_LOADING_ADS = "TOGGLE_LOADING_ADS";
export const GET_ADS = "GET_ADS";
export const GET_MY_ADS = "GET_MY_ADS";

export const getAllAdsActions = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING_ADS });
    const { data: pendingAds } = await getPendingAds();
    const { data: approvedAds } = await getApprovedAds();
    dispatch({ type: GET_ADS, payload: { pendingAds, approvedAds } });
  };
};
export const getMyAdsAction = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING_ADS });
    const { data: ads } = await getMyAds();
    dispatch({ type: GET_MY_ADS, payload: ads });
  };
};
