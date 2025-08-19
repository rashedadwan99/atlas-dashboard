import { getMyProfileService, setUserToken } from "../../services/userService";

export const TOGGLE_AUTH = "TOGGLE_AUTH";
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const toggleAuthAction = () => {
  return { type: TOGGLE_AUTH };
};
export const getMyProfileAction = () => {
  return async (dispatch) => {
    try {
      const { data: user } = await getMyProfileService();
      dispatch({ type: GET_MY_PROFILE, payload: { name: user.name } });
    } catch (ex) {}
  };
};

export const toggleLoadingAction = (isSendingRequest) => {
  return { type: TOGGLE_LOADING, payload: { isSendingRequest } };
};
