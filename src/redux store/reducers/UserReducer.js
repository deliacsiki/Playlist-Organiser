import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  userId: null,
  displayName: null,
  email: null,
  userRooms: null,
  loading: false,
  error: null,
  currentRoom: null,
  sharedRooms: null,
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const getUserDataError = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const getUserDataSuccess = (state, { userId, displayName, email }) => {
  localStorage.setItem("userId", userId);

  return updateObject(state, {
    userId: userId,
    displayName: displayName,
    loading: false,
    email: email,
  });
};

const getUserRoomsSuccess = (state, { rooms }) => {
  return updateObject(state, {
    userRooms: rooms,
    loading: false,
    error: null,
  });
};

const createUserRoomSuccess = (state, { room }) => {
  var hardCopy = [...state.userRooms];
  hardCopy.push(room);
  return updateObject(state, {
    userRooms: hardCopy,
    loading: false,
    error: null,
  });
};

const deleteRoomSuccess = (state, { deletedRoomId }) => {
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

const enterRoom = (state, { room }) => {
  return updateObject(state, {
    error: null,
    loading: false,
    currentRoom: room,
  });
};

const joinRoom = (state, { room }) => {
  return updateObject(state, {
    error: null,
    loading: false,
    sharedRooms: [...state.sharedRooms, room],
  });
};

const getUserSharedRoomsSuccess = (state, { rooms }) => {
  return updateObject(state, {
    sharedRooms: rooms,
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

    case actionTypes.GET_SHARED_ROOMS_SUCCESS:
      return getUserSharedRoomsSuccess(state, action);

    case actionTypes.DELETE_ROOM_SUCCESS:
      return deleteRoomSuccess(state, action);

    case actionTypes.GET_USER_ROOMS_SUCCESS:
      return getUserRoomsSuccess(state, action);

    case actionTypes.CREATE_ROOM_SUCCESS:
      return createUserRoomSuccess(state, action);

    case actionTypes.GET_ROOM:
      return enterRoom(state, action);

    case actionTypes.JOIN_ROOM:
      return joinRoom(state, action);

    default:
      return state;
  }
};

export default UserReducer;
