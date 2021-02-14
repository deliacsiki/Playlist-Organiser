import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  userId: null,
  displayName: null,
  email: null,
  userRooms: null,
  loading: false,
  error: null,
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const getUserDataError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const getUserDataSuccess = (
  state,
  { userId, displayName, email, userRooms }
) => {
  localStorage.setItem("userId", userId);

  return updateObject(state, {
    userId: userId,
    displayName: displayName,
    loading: false,
    email: email,
    userRooms: userRooms,
  });
};

const updateUserRooms = (state, { deletedRoomId }) => {
  var roomToBeDeleted = state.userRooms.find(
    (room) => room._id === deletedRoomId
  );
  var hardCopy = [...state.userRooms];
  hardCopy.splice(hardCopy.indexOf(roomToBeDeleted), 1);
  return updateObject(state, {
    userRooms: hardCopy,
    loading: false,
    error: null,
  });
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA_START:
      return getUserDataStart(state, action);

    case actionTypes.GET_USER_DATA_ERROR:
      return getUserDataError(state, action);

    case actionTypes.GET_USER_DATA_SUCCESS:
      return getUserDataSuccess(state, action);

    case actionTypes.UPDATE_USER_ROOMS:
      return updateUserRooms(state, action);

    default:
      return state;
  }
};

export default UserReducer;
