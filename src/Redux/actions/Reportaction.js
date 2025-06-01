import {
  CREATEREPORT,
  GET_ERROR,
  GET_SPECIFIC_REPORT,
  GETPPATIENTWITHREPORT,
  DELETEMYREPORT,
} from "../type";
import { InsertDataWithImage } from "../../Hooks/useInsertData";
import { useGetDataToken } from "../../Hooks/useGetData";
import DeleteData from "../../Hooks/useDeleteData";
export const CreateReport = (FormatData, id) => async (dispatch) => {
  try {
    const response = await InsertDataWithImage(
      `/api/v1/report/${id}`,
      FormatData
    );
    dispatch({
      type: CREATEREPORT,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: CREATEREPORT,
      payload: e.response,
    });
    return e.response;
  }
};

export const getSpecificReport = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/report/myreport/${id}`);

    dispatch({
      type: GET_SPECIFIC_REPORT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_SPECIFIC_REPORT,
      payload: e.response,
    });
  }
};
export const getPatientWithReport = (id) => async (dispatch) => {
  try {
    // امسح الداتا القديمة وفعل حالة التحميل
    dispatch({ type: "CLEAR_PATIENT_REPORT" });

    const response = await useGetDataToken(
      `/api/v1/patient/myPatientwithreport/${id}`
    );

    dispatch({
      type: GETPPATIENTWITHREPORT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GETPPATIENTWITHREPORT,
      payload: e.response,
    });
  }
};

export const deleteMyReport = (id) => async (dispatch) => {
  try {
    const response = await DeleteData(`/api/v1/report/myreport/${id}`);

    dispatch({
      type: DELETEMYREPORT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETEMYREPORT,
      payload: e.response,
    });
  }
};
