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
        .catch(() => {
          dispatch(searchSongError("Some error"));
        });
    } else {
      // token either expired or user not logged in
      window.location.href = Constants.LOCALHOST_URL_CLIENT;
    }
  };
};
