import * as actionTypes from "../ActionConstants";
import * as Constants from "../URLConstants";
import axios from "axios";

// get data about user

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START,
  };
};

export const getUserDataSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    user: user,
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
          localStorage.setItem("userId", response.data.id);
          dispatch(getUserDataSuccess(response.data));
          dispatch(getUserRooms(response.data.id));
          dispatch(getUserSharedRooms(response.data.id));
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

export const getUserRooms = (id = null) => {
  return (dispatch) => {
    let url = Constants.GET_ROOMS_BY_OWNER.replace(
      "{id}",
      id || localStorage.getItem("userId")
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

export const getUserSharedRooms = (id = null) => {
  return (dispatch) => {
    let url = Constants.GET_SHARED_ROOMS.replace(
      "{id}",
      id || localStorage.getItem("userId")
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

// unshare a room for curernt user
export const unsubscribeUserRoom = (roomId, userId) => {
  return (dispatch) => {
    let url = Constants.UNSUBSCRIBE_ROOM;
    var body = {
      roomId: roomId,
      userId: userId ? userId : localStorage.getItem("userId"),
    };
    axios.post(url, body).then((res) => {
      if (res.data) {
        console.log(
          `[RoomAction] Successfully unsubscribed from room with id ${roomId}`
        );
        dispatch({
          type: actionTypes.UNSUBSCRIBE_ROOM,
          roomId: roomId,
        });
      }
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

export const createNewRoom = (roomName, userId) => {
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
          return true;
        } else {
          console.log("No response");
          dispatch(createNewRoomError());
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(createNewRoomError());
        return false;
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

// join room
export const joinRoom = (room, userId) => {
  return (dispatch) => {
    const userID = userId ? userId : localStorage.getItem("userId");
    if (room.people.find((user) => user === userID)) {
      window.location.href = `${Constants.LOCALHOST_URL_CLIENT}/room?id=${room._id}`;
      return;
    }

    let body = {
      room: {
        people: [...room.people, userID],
      },
    };
    var url = Constants.JOIN_ROOM.replace("{id}", room._id);
    axios.put(url, body).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: actionTypes.JOIN_ROOM,
          room: response.data,
        });
        window.location.href = `${Constants.LOCALHOST_URL_CLIENT}/room?id=${room._id}`;
      }
    });
  };
};
