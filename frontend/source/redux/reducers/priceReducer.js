import {
  PRICE_LIST_FAILED,
  PRICE_LIST_REQUEST,
  PRICE_LIST_SUCCESS,
} from "../constants/productConstant";

export const priceReducer = (state = { prices: [] }, action) => {
  console.log(action.type);
  switch (action.type) {
    case PRICE_LIST_REQUEST:
      return {
        loading: true,
        prices: [],
      };
    case PRICE_LIST_SUCCESS:
      return {
        loading: false,
        prices: action.payload,
      };
    case PRICE_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
