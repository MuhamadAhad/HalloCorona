import { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE } from "../_constants";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const articles = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ARTICLES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ARTICLES}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `'${GET_ARTICLES}_REJECTED`:
      return {
        ...state,
        data: [],
        error: true,
      };
    default:
      return state;
  }
};

export const article = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_ARTICLE}_PENDING`:
    case `${GET_ARTICLE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_ARTICLE}_FULFILLED`:
    case `${GET_ARTICLE}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `${CREATE_ARTICLE}_REJECTED`:
    case `'${GET_ARTICLE}_REJECTED`:
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
