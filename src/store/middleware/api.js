import axios from "axios";
import { API_URL } from "../../config";
import * as actions from "../api";
import { getToken } from "../../utils/jwtUtil";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const token = getToken();

    const options = {
      baseURL: API_URL,
      url,
      method,
      data,
      responseType: "json",
      ...(token && {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": token,
        },
      }),
    };

    const response = await axios.request(options);

    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    const data = error.response.data;
    const message = data.error ? data.error.message : data.message;
    dispatch(actions.apiCallFailed(message));
    if (onError) dispatch({ type: onError, payload: message });
  }
};

export default api;
