import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  error: null,
  token: null,
  loading: false,
  stateReceived: null,
  redirectURL: null,
};

const authenticationStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authenticationSuccess = (state, { token }) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: token,
  });
};

const authenticationError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const authenticationLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const connectionSpotifySuccess = (state, { redirectURL, checkState }) => {
  return updateObject(state, {
    loading: false,
    redirectURL: redirectURL,
    stateReceived: checkState,
  });
};

const connectionSpotifyError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SPOTIFY_CONNECT_SUCCESS:
      return connectionSpotifySuccess(state, action);

    case actionTypes.SPOTIFY_CONNECT_ERROR:
      return connectionSpotifyError(state, action);

    case actionTypes.AUTHENTICATION_START:
      return authenticationStart(state, action);

    case actionTypes.AUTHENTICATION_SUCCESS:
      return authenticationSuccess(state, action);

    case actionTypes.AUTHENTICATION_ERROR:
      return authenticationError(state, action);

    case actionTypes.AUTHENTICATION_LOGOUT:
      return authenticationLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
