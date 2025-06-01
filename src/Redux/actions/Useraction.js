import axios from "axios";
import {
  CREATEUSER,
  VERIFY_EMAIL_REQUEST,
  LOGINUSER,
  FORGETPASSWORD,
  VERIFYPASSWORD,
  CREATE_NEW_PASSWORD,
  UPDATE_USER_PROFILE,
  UPDATELOGGEDUSERPASSWORD,
} from "../type";
import { InsertData, InsertDataWithImage } from "../../Hooks/useInsertData";
import {
  updateData,
  UpdateDataWithImage,
  updateDataWithToken,
} from "../../Hooks/useUpdateData";

export const CreateUser = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertDataWithImage(`/api/v1/auth/signup`, MYdata);

    dispatch({
      type: CREATEUSER,
      payload: response,
      loading: true,
    });
    return response;
  } catch (e) {
    dispatch({
      type: CREATEUSER,
      payload: e.response,
    });
    return e.response;
  }
};

export const LoginUser = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertData(`/api/v1/auth/login`, MYdata);

    dispatch({
      type: LOGINUSER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGINUSER,
      payload: e.response,
    });
  }
};

export const Create_New_Password = (data) => async (dispatch) => {
  try {
    const response = await updateData(`/api/v1/auth/resetpassword`, data);

    dispatch({
      type: CREATE_NEW_PASSWORD,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_NEW_PASSWORD,
      payload: e.response,
    });
  }
};

export const verifyPassword = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertData(`api/v1/auth/verifyresetcode`, MYdata);

    dispatch({
      type: VERIFYPASSWORD,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: VERIFYPASSWORD,
      payload: e.response,
    });
  }
};
export const ForgetPassword = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertData(`api/v1/auth/forgetpassword`, MYdata);

    dispatch({
      type: FORGETPASSWORD,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: FORGETPASSWORD,
      payload: e.response,
    });
  }
};
export const verifyEmailCode = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/verifyemailcode",
      {
        token: token,
      }
    );

    dispatch({
      type: VERIFY_EMAIL_REQUEST,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_REQUEST,
      payload: error.response?.data?.message || "Verification failed",
    });
  }
};

export const updateUserProfileData = (body) => async (dispatch) => {
  try {
    const response = await UpdateDataWithImage(
      `/api/v1/user/updatemydata`,
      body
    );
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: e.response,
    });
  }
};

export const UpdateLoggedUserPassword = (body) => async (dispatch) => {
  try {
    const response = await updateDataWithToken(
      `/api/v1/user/changemypassword`,
      body
    );
    dispatch({
      type: UPDATELOGGEDUSERPASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATELOGGEDUSERPASSWORD,
      payload: e.response,
    });
  }
};
