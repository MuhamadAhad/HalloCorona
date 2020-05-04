import { createStore, combineReducers, applyMiddleware } from "redux";
import modal from "../_reducers/modal";
import { promise, processSign, checkDataSign } from "../_middlewares";
import { articles, article } from "../_reducers/article";
import { sign, dataSign, profile, password } from "../_reducers/user";
import { consultations, consultation } from "../_reducers/consultation";

const reducers = combineReducers({
  modal,
  articles,
  article,
  sign,
  dataSign,
  profile,
  password,
  consultation,
  consultations,
});
const middleware = [promise, processSign, checkDataSign];

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
