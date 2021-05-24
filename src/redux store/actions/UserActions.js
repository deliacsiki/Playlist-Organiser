import * as actionTypes from "../ActionConstants";
import * as Constants from "../URLConstants";
import axios from "axios";

// get data about user

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START,
  };
};

export const getUserDataSuccess = ({ id, displayName, email }) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userId: id,
    displayName: displayName,
    email: email,
  };
};

export const getUserDataError = (error) => {
  return {
    type: actionTypes.GET_USER_DATA_ERROR,
    error: error,
  };
};

export const getUserData = () => {
  return (dispatch) => {
    dispatch(getUserDataStart());
    let url = Constants.GET_USER_DATA;
    axios
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then((response) => {
        console.log("[UserAction] Successfully received user data");
        if (response.data) {
          dispatch(getUserDataSuccess(response.data));
          dispatch(getUserRooms());
          dispatch(getUserSharedRooms());
        }
      })
      .catch((error) => {
        console.log(error.response);
        window.location.href = Constants.LOCALHOST_URL_CLIENT;
        dispatch(getUserDataError(error));
      });
  };
};

// get rooms owned by current user
export const getUserRoomsSuccess = (rooms) => {
  return {
    type: actionTypes.GET_USER_ROOMS_SUCCESS,
    rooms: rooms,
  };
};

export const getUserRoomsError = (error) => {
  return {
    type: actionTypes.GET_USER_ROOMS_ERROR,
    error: error,
  };
};

export const getUserRooms = () => {
  return (dispatch) => {
    let url = Constants.GET_ROOMS_BY_OWNER.replace(
      "{id}",
      localStorage.getItem("userId")
    );
    axios
      .get(url)
      .then((response) => {
        console.log("[UserAction] Successfully received user's rooms");
        if (response.data) {
          dispatch(getUserRoomsSuccess(response.data));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(getUserRoomsError(error.response));
      });
  };
};

// get rooms shared with user
export const getUserSharedRoomsSuccess = (rooms) => {
  return {
    type: actionTypes.GET_SHARED_ROOMS_SUCCESS,
    rooms: rooms,
  };
};

export const getUserSharedRoomsError = (error) => {
  return {
    type: actionTypes.GET_SHARED_ROOMS_ERROR,
    error: error,
  };
};

export const getUserSharedRooms = () => {
  return (dispatch) => {
    let url = Constants.GET_SHARED_ROOMS.replace(
      "{id}",
      localStorage.getItem("userId")
    );
    axios
      .get(url)
      .then((response) => {
        console.log("[UserAction] Successfully received user's shared rooms");
        if (response.data) {
          dispatch(getUserSharedRoomsSuccess(response.data));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(getUserSharedRoomsError(error.response));
      });
  };
};

// delete a room for current user

export const deleteRoomSuccess = (roomId) => {
  return {
    type: actionTypes.DELETE_ROOM_SUCCESS,
    deletedRoomId: roomId,
  };
};

export const deleteRoomError = (error) => {
  return {
    type: actionTypes.DELETE_ROOM_ERROR,
    error: error,
  };
};

export const deleteUserRoom = (roomId) => {
  return (dispatch) => {
    let url = Constants.DELETE_ROOM.replace("{id}", roomId);
    axios
      .delete(url)
      .then((response) => {
        console.log(`[RoomAction] Successfully deleted room with id ${roomId}`);
        dispatch(deleteRoomSuccess(roomId));
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteRoomError());
      });
  };
};

// create a new room for current user

export const createNewRoomSuccess = (room) => {
  return {
    type: actionTypes.CREATE_ROOM_SUCCESS,
    room: room,
  };
};

export const createNewRoomError = () => {
  return {
    type: actionTypes.CREATE_ROOM_ERROR,
  };
};

export const createNewRoom = ({ roomName, userId }) => {
  return (dispatch) => {
    let url = Constants.CREATE_ROOM;
    let body = {
      roomName: roomName,
      userId: userId ? userId : localStorage.getItem("userId"),
    };
    axios
      .post(url, body)
      .then((response) => {
        if (response) {
          console.log(
            `[RoomAction] Successfully created room with name ${roomName}`
          );
          dispatch(createNewRoomSuccess(response.data));
        } else {
          console.log("No response");
          dispatch(createNewRoomError());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(createNewRoomError());
      });
  };
};

// enter room

export const getRoom = (roomId) => {
  return (dispatch) => {
    var url = Constants.GET_ONE_ROOM.replace("{id}", roomId);
    axios.get(url).then((response) => {
      dispatch({
        type: actionTypes.GET_ROOM,
        room: response.data,
      });
    });
  };
};
