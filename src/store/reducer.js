import { combineReducers } from "redux";

import auth from "./auth/login";
import entities from "./entities";

export default combineReducers({
  auth,
  entities,
});
