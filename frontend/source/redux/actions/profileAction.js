import { getUserById } from "../../api";
import {
  PROFILE_FAILED,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstant";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_REQUEST });
    const { data } = await getUserById();
    console.log(data);
    dispatch({
      type: PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: PROFILE_FAILED,
        payload: error.response ? error.response.data.message : error,
      });
    }
  }
};
