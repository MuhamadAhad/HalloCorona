import {
  GET_CONSULTATIONS,
  GET_CONSULTATION,
  CREATE_CONSULTATION,
  RESPONSE_CONSULTATION,
} from "../_constants";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const consultations = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CONSULTATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CONSULTATIONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `'${GET_CONSULTATIONS}_REJECTED`:
      return {
        ...state,
        data: [],
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const consultation = (state = initialState, action) => {
  switch (action.type) {
    case `${RESPONSE_CONSULTATION}_PENDING`:
    case `${CREATE_CONSULTATION}_PENDING`:
    case `${GET_CONSULTATION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${RESPONSE_CONSULTATION}_FULFILLED`:
    case `${CREATE_CONSULTATION}_FULFILLED`:
    case `${GET_CONSULTATION}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `${RESPONSE_CONSULTATION}_REJECTED`:
    case `${CREATE_CONSULTATION}_REJECTED`:
    case `'${GET_CONSULTATION}_REJECTED`:
      return {
        ...state,
        data: [],
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
