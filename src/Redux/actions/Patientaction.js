import {
  CREATEPATIENT,
  GET_ERROR,
  GETPATIENT,
  GET_MY_PATIENT,
  DELETMYPATIENT,
  SENDPATIENT,
  GETSPECIFICPATIENT,
  GET_MY_ARCHIVEDPATIENT,
  ARCHIVEDPATIENT,
  REPORTSTATS,
} from "../type";
import { InsertData } from "../../Hooks/useInsertData";
import { useGetDataToken } from "../../Hooks/useGetData";
import DeleteData from "../../Hooks/useDeleteData";
import { updateDataWithToken } from "../../Hooks/useUpdateData";

export const CreatePatient = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertData(`/api/v1/patient`, MYdata);

    dispatch({
      type: CREATEPATIENT,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const SendPatient = (MYdata) => async (dispatch) => {
  try {
    const response = await InsertData(`/api/v1/patient/send`, MYdata);

    dispatch({
      type: SENDPATIENT,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: SENDPATIENT,
      payload: e.response,
    });
  }
};

export const getREPORTSTATS = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/patient/ReportStats`);

    dispatch({
      type: REPORTSTATS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const getAllpatient = (limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/patient/mypatients?limit=${limit}`
    );

    dispatch({
      type: GETPATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const getMypatient = (limit, keyword) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/patient/mypatients?limit=${limit}&keyword=${keyword}`
    );

    dispatch({
      type: GET_MY_PATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_MY_PATIENT,
      payload: e.response,
    });
  }
};
export const getSpecificpatient = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/patient/myPatient/${id}`);

    dispatch({
      type: GETSPECIFICPATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GETSPECIFICPATIENT,
      payload: e.response,
    });
  }
};

export const deleteMyPatient = (id) => async (dispatch) => {
  try {
    const response = await DeleteData(`/api/v1/patient/deleteMyPatient/${id}`);

    dispatch({
      type: DELETMYPATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETMYPATIENT,
      payload: e.response,
    });
  }
};
export const getAllMyPatientPage = (page) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/patient/mypatients?limit=10&page=${page}`
    );
    dispatch({
      type: GET_MY_PATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const getMyArchivedpatient = (limit, keyword) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/patient/myArchivepatients?limit=${limit}&keyword=${keyword}`
    );

    dispatch({
      type: GET_MY_ARCHIVEDPATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_MY_ARCHIVEDPATIENT,
      payload: e.response,
    });
  }
};

export const getAllMyArchivedPatientPage = (page) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/patient/myArchivepatients?limit=10&page=${page}`
    );
    dispatch({
      type: GET_MY_ARCHIVEDPATIENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const toggleArchivePatient = (id) => async (dispatch) => {
  try {
    const response = await updateDataWithToken(
      `/api/v1/patient/myPatient/${id}`
    );
    dispatch({
      type: ARCHIVEDPATIENT,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ARCHIVEDPATIENT,
      payload: e.response,
    });
  }
};
