import {
  BRAND_LIST_FAILED,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstant";

export const brandReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return {
        loading: true,
        brands: [],
      };
    case BRAND_LIST_SUCCESS:
      return {
        loading: false,
        brands: action.payload,
      };
    case BRAND_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
