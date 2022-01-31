import axios from "axios";
import { baseUrl } from "../../api";
import {
  PRODUCT_FILTER_FAILED,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
} from "../constants/filterConstant";

export const filterProduct =
  (categoryId, brandId, from, to) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_FILTER_REQUEST });
      const data = await axios.get(`${baseUrl}products/multicondition`, {
        data: {
          categoryId: categoryId,
          brandId: brandId,
          from: Number.parseInt(from),
          to: Number.parseInt(to),
        },
      });
      dispatch({ type: PRODUCT_FILTER_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_FILTER_FAILED,
        payload: error.response.data && error.response.data.message,
      });
    }
  };
