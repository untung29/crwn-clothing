// Represent all of the reducers
import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";

export default combineReducers({
  user: userReducer,
});
