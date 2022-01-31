import {
  SIGNIN_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../constants/authConstant";

export const signinReducer = (state = { user: {} }, action) => {
  console.log(action.type);
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case SIGNIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const signupReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case SIGNUP_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
