import {
  PRODUCT_FILTER_FAILED,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
} from "../constants/filterConstant";

export const filterReducer = (state = { productFilter: [] }, action) => {
  console.log(action.type);
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return {
        loading: true,
        productFilter: [],
      };
    case PRODUCT_FILTER_SUCCESS:
      return {
        loading: false,
        productFilter: action.payload,
      };
    case PRODUCT_FILTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
