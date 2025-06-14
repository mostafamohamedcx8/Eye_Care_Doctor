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

const inital = {
  patient: [],
  getpatient: [],
  getspecificpatient: [],
  mypatient: [],
  deletpatient: [],
  sendpatient: [],
  archivedpatient: [],
  unarchivedpatient: [],
  reportstats: [],
  loading: true,
};
const patientReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATEPATIENT:
      return {
        ...state,
        patient: action.payload,
        loading: false,
      };
    case SENDPATIENT:
      return {
        ...state,
        sendpatient: action.payload,
        loading: false,
      };
    case GETPATIENT:
      return {
        ...state,
        getpatient: action.payload,
        loading: false,
      };
    case GET_MY_PATIENT:
      return {
        ...state,
        mypatient: action.payload,
        loading: false,
      };
    case REPORTSTATS:
      return {
        ...state,
        reportstats: action.payload,
        loading: false,
      };
    case ARCHIVEDPATIENT:
      return {
        ...state,
        unarchivedpatient: action.payload,
        loading: false,
      };
    case GET_MY_ARCHIVEDPATIENT:
      return {
        ...state,
        archivedpatient: action.payload,
        loading: false,
      };
    case GETSPECIFICPATIENT:
      return {
        ...state,
        getspecificpatient: action.payload,
        loading: false,
      };
    case DELETMYPATIENT:
      return {
        ...state,
        deletpatient: action.payload,
      };
    case GET_ERROR:
      return {
        loading: true,
        patient: action.payload,
      };

    default:
      return state;
  }
};
export default patientReducer;
