import {
  SIGNIN,
  DATASIGN,
  PROFILE,
  CHANGE_PASSWORD,
  SIGNUP,
} from "../_constants";
import { API } from "../config/API";

export const userSignin = (data) => {
  return {
    type: SIGNIN,
    payload: async () => {
      try {
        const user = await API.post("/signin", data);
        return user.data;
      } catch (error) {
        console.log(error);
        return {
          msg: "Server offline",
        };
      }
    },
  };
};

export const dataSign = () => {
  return {
    type: DATASIGN,
  };
};

//get Profile for page Detail Profile(Owner & tenant)
export const getProfile = () => {
  return {
    type: PROFILE,
    payload: async () => {
      try {
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        const user = await API.get("/profile");
        return user.data;
      } catch (error) {
        console.log(error);
        return {
          msg: "Server offline",
        };
      }
    },
  };
};

export const changePassword = (data) => {
  return {
    type: CHANGE_PASSWORD,
    payload: async () => {
      try {
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        const user = await API.patch("/profile", data);
        return user.data;
      } catch (error) {
        console.log(error);
        return {
          msg: "Server offline",
        };
      }
    },
  };
};

export const userSignup = (data) => {
  return {
    type: SIGNUP,
    payload: async () => {
      try {
        const user = await API.post("/signup", data);
        return user.data;
      } catch (error) {
        console.log(error);
        return {
          msg: "Server offline",
        };
      }
    },
  };
};
