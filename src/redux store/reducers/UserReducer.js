import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  userId: null,
  displayName: null,
  loading: false,
  error: null,
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const getUserDataError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const getUserDataSuccess = (state, { userId, displayName }) => {
  return updateObject(state, {
    userId: userId,
    displayName: displayName,
    loading: false,
  });
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DATA_START:
      return getUserDataStart(state, action);

    case actionTypes.USER_DATA_ERROR:
      return getUserDataError(state, action);

    case actionTypes.USER_DATA_SUCCESS:
      return getUserDataSuccess(state, action);

    default:
      return state;
  }
};

export default UserReducer;
