import * as auth from "../store/auth/login";

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(auth.login(JSON.stringify({ username, password })));
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(auth.logout());
  };
};
