import * as actionTypes from "../ActionConstants";
import axios from "axios";

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};
export const authenticationSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authenticationError = (error) => {
  return {
    type: actionTypes.AUTHENTICATION_ERROR,
    error: error,
  };
};

export const authenticationLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userID");
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT,
  };
};

export const checkAuthenticationTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authenticationLogout());
    }, expirationTime * 1000);
  };
};

export const authenticate = (email, password, isSignedUp) => {
  return (dispatch) => {
    const authenticationData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    dispatch(authenticationStart());

    let url = "enter here login url";
    if (!isSignedUp) {
      url = "enter here sign up url";
    }

    axios
      .post(url, authenticationData)
      .then((res) => {
        // save token, expiration time and user in local storage
        // dispatch successfull auth and timeout for expiration date
        console.log("[LoginAction] Received following data: ", res.data);
      })
      .catch((error) => {
        dispatch(authenticationError(error.response.data.error));
      });
  };
};

export const authenticationCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authenticationLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authenticationLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authenticationSuccess(token, userId));
        dispatch(
          checkAuthenticationTimeout(
            expirationDate.getTime() - new Date().getTime() / 1000
          )
        );
      }
    }
  };
};
