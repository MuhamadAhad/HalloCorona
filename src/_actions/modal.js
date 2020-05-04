import {
  MODAL_SIGNIN,
  MODAL_SIGNUP,
  MODAL_PASSWORD,
  MODAL_APPROVAL,
} from "../_constants";

export const clickModalSignin = () => {
  return {
    type: MODAL_SIGNIN,
  };
};

export const clickModalSignup = () => {
  return {
    type: MODAL_SIGNUP,
  };
};

export const clickModalPassword = () => {
  return {
    type: MODAL_PASSWORD,
  };
};

export const clickModalApproval = () => {
  return {
    type: MODAL_APPROVAL,
  };
};
