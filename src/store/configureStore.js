import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "./reducer";
import api from "./middleware/api";

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), logger, api],
});
