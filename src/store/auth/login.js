import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const url = "/auth/login";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
      auth.error = null;
    },
    authReceived: (auth, action) => {
      auth.isAuthenticated = true;
      auth.user = action.payload;
      auth.loading = false;
    },
    authFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },
    loggedOut: (auth, action) => {
      auth.isAuthenticated = false;
      auth.user = undefined;
      auth.error = null;
      auth.loading = false;
    },
  },
});

const { authRequested, authReceived, authFailed, loggedOut } = loginSlice.actions;

export const login = (data) =>
  apiCallBegan({
    url,
    method: "post",
    data,
    onStart: authRequested.type,
    onSuccess: authReceived.type,
    onError: authFailed.type,
  });

export const logout = ({ dispatch }) => {
  dispatch({ type: loggedOut.type });
};

export default loginSlice.reducer;
