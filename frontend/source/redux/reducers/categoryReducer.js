import {
  CATEGORY_LIST_FAILED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryContant";

export const categoryReducer = (state = { category: [] }, action) => {
  console.log(action.type);
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        category: [],
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CATEGORY_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
