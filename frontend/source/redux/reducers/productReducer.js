import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
} from "../constants/adminProductConstant";
import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const productReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addProductReducer = (state = { product: null }, action) => {
  console.log(action.type);
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
        product: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
