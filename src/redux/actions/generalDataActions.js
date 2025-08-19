import { getCategories } from "../../services/catergoryService";
import { getCountries } from "../../services/countriesService";

export const GET_GENERAL_DATA = "GET_GENERAL_DATA";
export const getGeneralDataAction = () => {
  return async (dispatch) => {
    const { data: categories } = await getCategories();
    const { data: countries } = await getCountries();
    dispatch({ type: GET_GENERAL_DATA, payload: { categories, countries } });
  };
};
