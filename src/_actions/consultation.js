import {
  GET_CONSULTATIONS,
  GET_CONSULTATION,
  RESPONSE_CONSULTATION,
  CREATE_CONSULTATION,
} from "../_constants";
import { API, setAuthToken } from "../config/API";

export const getConsultations = (data) => {
  return {
    type: GET_CONSULTATIONS,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        let consuls = "";
        if (data) {
          consuls = await API.get(`/consultations?status=${data}`);
        } else {
          consuls = await API.get(`/consultations`);
        }
        return consuls.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getConsultation = (data) => {
  return {
    type: GET_CONSULTATION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const consuls = await API.get(`/consultation/${data}`);
        return consuls.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const responseConsultation = (data, id) => {
  return {
    type: RESPONSE_CONSULTATION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const consul = await API.post(`/consultation/${id}/reply`, data);
        return consul.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const createConsultation = (data) => {
  return {
    type: CREATE_CONSULTATION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const consul = await API.post("/consultations", data);
        return consul.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
