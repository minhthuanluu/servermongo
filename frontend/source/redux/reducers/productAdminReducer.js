import {
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

export const productAdminReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: null,
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_ALL_PRODUCT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = { success: false }, action) => {
  switch (action.payload) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
        success: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS: {
      return {
        loading: false,
        success: action.payload,
      };
    }
    case DELETE_PRODUCT_FAILED: {
      return {
        loading: false,
        success: action.payload,
      };
    }
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: null }, action) => {
  switch (action.payload) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        product: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case UPDATE_PRODUCT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
