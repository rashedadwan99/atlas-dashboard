import { getUserToken } from "../../services/userService";
import {
  GET_MY_PROFILE,
  TOGGLE_AUTH,
  TOGGLE_LOADING,
} from "../actions/userActions";

const initialState = {
  isAuth: getUserToken() ?? false,
  value: {},
  isSendingRequest: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    case GET_MY_PROFILE:
      return { ...state, isAuth: true, value: { name: action.payload.name } };
    case TOGGLE_LOADING:
      return { ...state, isSendingRequest: action.payload?.isSendingRequest };

    default:
      return state;
  }
};
