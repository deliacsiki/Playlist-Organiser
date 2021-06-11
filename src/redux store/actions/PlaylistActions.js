import * as actionTypes from "../ActionConstants";
import * as Constants from "../URLConstants";
import axios from "axios";

// search for a song
export const searchSongStart = () => {
  return {
    type: actionTypes.SEARCH_SONG_START,
  };
};

export const searchSongSuccess = (songs) => {
  return {
    type: actionTypes.SEARCH_SONG_SUCCESS,
    songs: songs,
  };
};

export const searchSongError = (error) => {
  return {
    type: actionTypes.SEARCH_SONG_ERROR,
    error: error,
  };
};

export const searchSong = (songName) => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    if (token) {
      dispatch(searchSongStart());
      var url = Constants.SEARCH_FOR_SONG.replace("{:song}", songName);

      axios
        .get(url, { headers: { Authorization: token } })
        .then((response) => {
          dispatch(searchSongSuccess(response.data));
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response)
            if (error.response.status === 401) {
              // token expired
              dispatch(searchSongError("Some error"));
              window.location.href = Constants.LOCALHOST_URL_CLIENT;
            }
        });
    } else {
      // token either expired or user not logged in
      window.location.href = Constants.LOCALHOST_URL_CLIENT;
    }
  };
};

// get a song
export const getTrackSuccess = (song) => {
  return {
    type: actionTypes.GET_TRACK_SUCCESS,
    song: song,
  };
};

export const getTrackError = (error) => {
  return {
    type: actionTypes.GET_TRACK_ERROR,
    song: error,
  };
};

export const getTrack = (songId) => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    if (token) {
      var url = Constants.GET_SONG_BY_ID.replace("{:id}", songId);

      axios
        .get(url, { headers: { Authorization: token } })
        .then((response) => {
          dispatch(getTrackSuccess(response.data));
        })
        .catch(() => {
          dispatch(getTrackError("Some error"));
        });
    } else {
      // token either expired or user not logged in
      window.location.href = Constants.LOCALHOST_URL_CLIENT;
    }
  };
};

// play a song

export const playSongSuccess = () => {
  return {
    type: actionTypes.PLAY_SONG_SUCCESS,
  };
};

export const playSong = (songUri, deviceId = null) => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    if (token) {
      var url = Constants.PLAY_SONG;
      var postData = {
        deviceId: deviceId || null,
        uri: songUri,
      };
      axios
        .post(url, postData, { headers: { Authorization: token } })
        .then((response) => {
          dispatch(playSongSuccess(response.data.tracks));
        })
        .catch(() => {});
    } else {
      // token either expired or user not logged in
      window.location.href = Constants.LOCALHOST_URL_CLIENT;
    }
  };
};

// get available devices
export const getAvailableDevicesSuccess = (devicesList) => {
  return {
    type: actionTypes.GET_AVAILABLE_DEVICES,
    devices: devicesList,
  };
};

export const getAvailableDevices = () => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    if (token) {
      var url = Constants.GET_AVAILABLE_DEVICES;
      axios.get(url, { headers: { Authorization: token } }).then((response) => {
        dispatch(getAvailableDevicesSuccess(response.data));
      });
    } else {
      // token either expired or user not logged in
      window.location.href = Constants.LOCALHOST_URL_CLIENT;
    }
  };
};

// add song to voting list
export const addSongToVotingList = (votingListItem) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_NEW_SONG_TO_VOTING_LIST,
      item: votingListItem,
    });
  };
};

// update voting list
export const updateVotingList = (votingList) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_VOTING_LIST,
      votingList: votingList,
    });
  };
};


