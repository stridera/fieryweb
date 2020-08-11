import { combineReducers } from "redux";
import charactersReducer from "./characters";

export default combineReducers({
  characters: charactersReducer,
});
