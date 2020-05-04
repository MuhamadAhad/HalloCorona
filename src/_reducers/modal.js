import {
  MODAL_SIGNIN,
  MODAL_SIGNUP,
  MODAL_PASSWORD,
  MODAL_APPROVAL,
} from "../_constants";

const intialState = {
  modalSignin: false,
  modalSignup: false,
  modalPassword: false,
  modalApproval: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case MODAL_SIGNIN:
      return {
        ...state,
        modalSignup: false,
        modalSignin: !state.modalSignin,
      };
    case MODAL_SIGNUP:
      return {
        ...state,
        modalSignin: false,
        modalSignup: !state.modalSignup,
      };
    case MODAL_PASSWORD:
      return {
        ...state,
        modalPassword: !state.modalPassword,
      };
    case MODAL_APPROVAL:
      return {
        ...state,
        modalApproval: !state.modalApproval,
      };
    default:
      return state;
  }
};
export default reducer;
