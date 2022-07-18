import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import userReducer from "./user";

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer
})

export default reducers