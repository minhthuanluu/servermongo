import axios from "axios";
import { baseUrl } from "../../api";
import {
  PRICE_LIST_FAILED,
  PRICE_LIST_REQUEST,
  PRICE_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const _getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const res = await axios.get(`${baseUrl}products`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response ? error.response.data.message : error,
    });
  }
};

export const _getPriceList = () => async (dispatch) => {
  try {
    dispatch({ type: PRICE_LIST_REQUEST });
    const res = await axios.get(`${baseUrl}brand/priceList`);
    dispatch({ type: PRICE_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRICE_LIST_FAILED,
      payload: error.response ? error.response.data.message : error,
    });
  }
};
