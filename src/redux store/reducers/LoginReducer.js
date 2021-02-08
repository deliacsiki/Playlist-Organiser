import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  error: null,
  token: null,
  userId: null,
  loading: false,
};

const authenticationStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authenticationSuccess = (state, { token, userId }) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: token,
    userId: userId,
  });
};

const authenticationError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const authenticationLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
