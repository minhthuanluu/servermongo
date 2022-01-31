import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../api";
import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/adminProductConstant";

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    const { data } = await getAllProduct();
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_FAILED,
      payload: error.message || error.response.data.message,
    });
  }
};

export const _createAdminProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await addProduct(product);
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILED,
      payload: error.message || error.response.data.message,
    });
  }
};

export const _deleteAdminProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await deleteProduct(id);
    if (data) {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: true,
      });
    }
    dispatch(getAdminProduct());
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: error.message || error.response.data.message,
    });
  }
};

export const _updateAdminProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const { data } = await updateProduct(product, id);
    if (data) {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    }
    dispatch(getAdminProduct());
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILED,
      payload: error.message || error.response.data.message,
    });
  }
};
