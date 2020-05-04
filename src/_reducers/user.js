import {
  SIGNIN,
  SIGNUP,
  initialState,
  DATASIGN,
  PROFILE,
  CHANGE_PASSWORD,
} from "../_constants";

export const sign = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNUP}_PENDING`:
    case `${SIGNIN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${SIGNUP}_FULFILLED`:
    case `${SIGNIN}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case `${SIGNUP}_REJECTED`:
    case `${SIGNIN}_REJECTED`:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

const initState = {
  level: null,
  token: null,
  userName: null,
  signIn: false,
};
export const dataSign = (state = initState, action) => {
  switch (action.type) {
    case DATASIGN:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case `${PROFILE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${PROFILE}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case `${PROFILE}_REJECTED`:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export const password = (state = initialState, action) => {
  switch (action.type) {
    case `${CHANGE_PASSWORD}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CHANGE_PASSWORD}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case `${CHANGE_PASSWORD}_REJECTED`:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
