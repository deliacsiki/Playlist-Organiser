import * as actionTypes from "../ActionConstants";
import * as Constants from "../URLConstants";
import { getJsonFromUrl } from "../../common/utilities";
import axios from "axios";

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START,
  };
};

export const getUserDataSuccess = ({ id, displayName, email, rooms }) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userId: id,
    displayName: displayName,
    email: email,
    userRooms: rooms,
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
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(getUserDataError(error));
      });
  };
};

export const deleteRoomSuccess = (roomId) => {
  return {
    type: actionTypes.UPDATE_USER_ROOMS,
    deletedRoomId: roomId,
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
      });
  };
};
