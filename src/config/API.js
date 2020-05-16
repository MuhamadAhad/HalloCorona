import axios from "axios";

export const API = axios.create({
  //baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://hallocorona.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
