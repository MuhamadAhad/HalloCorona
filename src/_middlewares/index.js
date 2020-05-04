import { SIGNIN, SIGNUP, DATASIGN } from "../_constants";
import promise from "redux-promise-middleware";

export const processSign = () => {
  return (next) => {
    return async (action) => {
      if (action.type === `${SIGNIN}_FULFILLED` || `${SIGNUP}_FULFILLED`) {
        let found = false;
        for (const key in action.payload) {
          if (key === "data") {
            found = true;
            break;
          }
        }
        if (found === true) {
          for (let key in action.payload.data) {
            localStorage.setItem(key, action.payload.data[key]);
          }
        }
      }
      return next(action);
    };
  };
};

export const checkDataSign = () => {
  return (next) => {
    return (action) => {
      if (action.type === DATASIGN) {
        let signIn = true;
        action.payload = {
          level: localStorage.getItem("level"),
          userName: localStorage.getItem("userName"),
          token: localStorage.getItem("token"),
        };
        for (const key in action.payload) {
          if (action.payload[key] === null) {
            signIn = false;
            break;
          }
        }
        action.payload.signIn = signIn;
      }
      return next(action);
    };
  };
};

export { promise };
