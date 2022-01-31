import axios from "axios";
import { baseUrl } from "../../api";
import { getAllBrand } from "../../api/constant";
import {
  BRAND_LIST_FAILED,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstant";

export const _getBrandList = () => async (dispatch) => {
  dispatch({ type: BRAND_LIST_REQUEST });
  try {
    const res = await axios.get(`${baseUrl}brand`);
    console.log(res.data);
    dispatch({ type: BRAND_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAILED,
      payload:
        error && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
