import { fetchCategories } from "../../fetchers/fetchCategories";
import { setCategories, setError } from "../slice/shop";

export const loadCategories = () => async (dispatch) => {
  try {
    const category = await fetchCategories();
    dispatch(setCategories(category));
  } catch (e) {
    console.error(e);
    dispatch(setError("Something went wrong"));
  }
};
