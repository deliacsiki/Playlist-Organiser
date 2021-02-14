import * as actionTypes from "../ActionConstants";
import * as Constants from "../URLConstants";
import axios from "axios";
import { getJsonFromUrl } from "../../common/utilities";

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};

export const authenticationSuccess = (token) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
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
  // localStorage.removeItem("expirationDate");
  localStorage.removeItem("state");
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

export const authenticate = (code) => {
  return (dispatch) => {
    dispatch(authenticationStart());
    var url = Constants.GET_ACCESS_TOKEN;
    axios
      .get(url, { headers: { Authorization: code } })
      .then((response) => {
        var token = response.data.access_token;
        localStorage.setItem("token", token);
        dispatch(authenticationSuccess(token));
      })
      .catch((error) => {
        dispatch(authenticationError(error));
      });
  };
};

export const connectToSpotifySuccess = (redirectURL, state) => {
  return {
    type: actionTypes.SPOTIFY_CONNECT_SUCCESS,
    redirectURL: redirectURL,
    checkState: state,
  };
};

export const connectToSpotifyError = (error) => {
  return {
    type: actionTypes.SPOTIFY_CONNECT_SUCCESS,
    error: error,
  };
};

export const connectToSpotify = () => {
  return (dispatch) => {
    let url = Constants.AUTHORIZATION;
    axios
      .get(url)
      .then((response) => {
        console.log("[LoginAction] Successfully connected to Spotify");
        if (response.data.url) {
          let queryParams = getJsonFromUrl(response.data.url);
          dispatch(
            connectToSpotifySuccess(response.data.url, queryParams.state)
          );
        }
      })
      .catch((error) => {
        dispatch(connectToSpotifyError(error));
      });
  };
};

export const authenticationCheckState = () => {
  // return (dispatch) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     dispatch(authenticationLogout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem("expirationDate"));
  //     if (expirationDate <= new Date()) {
  //       dispatch(authenticationLogout());
  //     } else {
  //       const state = localStorage.getItem("state");
  //       dispatch(authenticationSuccess(token, state));
  //       dispatch(
  //         checkAuthenticationTimeout(
  //           expirationDate.getTime() - new Date().getTime() / 1000
  //         )
  //       );
  //     }
  //   }
  // };
};
