import { login, register } from "../../api";
import {
  SIGNIN_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../constants/authConstant";

export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });
    const { data } = await login(email, password);
    console.log(data);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup =
  (name, email, password, phone, apartment, zip, city, country) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      const { data } = await register(
        name,
        email,
        password,
        phone,
        apartment,
        zip,
        city,
        country
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
