import {
  PROFILE_FAILED,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstant";

export const profileReducer = (state = { user: {} }, action) => {
  console.log(action.type);
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
