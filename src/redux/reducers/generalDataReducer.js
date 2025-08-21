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
        directories: action.payload.directories,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
