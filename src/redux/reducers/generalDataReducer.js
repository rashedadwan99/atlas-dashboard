import { GET_GENERAL_DATA } from "../actions/generalDataActions";

const initialState = {};
export const generalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENERAL_DATA:
      return {
        ...state,
        categories: action.payload.categories,
        countries: action.payload.countries,
        sponsors: action.payload.sponsors,
      };
    default:
      return state;
  }
};
