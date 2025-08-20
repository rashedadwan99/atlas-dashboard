import { getCategories } from "../../services/catergoryService";
import { getCountries } from "../../services/countriesService";
import { getDirectories } from "../../services/directoriesServices";
import { getSponsors } from "../../services/sponsors";

export const GET_GENERAL_DATA = "GET_GENERAL_DATA";
export const getGeneralDataAction = () => {
  return async (dispatch) => {
    const { data: categories } = await getCategories();
    const { data: countries } = await getCountries();
    const { data: sponsors } = await getSponsors();
    const { data: directories } = await getDirectories();
    dispatch({
      type: GET_GENERAL_DATA,
      payload: { categories, countries, sponsors, directories },
    });
  };
};
