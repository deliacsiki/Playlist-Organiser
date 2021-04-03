import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  loading: false,
  queue: null,
  searchedSongs: null,
  recommendedSongs: null,
  currentSong: null,
  error: null,
};

const searchSongStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const searchSongSuccess = (state, { songs }) => {
  return updateObject(state, { loading: false, searchedSongs: songs });
};

const searchSongError = (state, { error }) => {
  return updateObject(state, {
    loading: false,
    error: error,
  });
};

const PlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_SONG_START:
      return searchSongStart(state);

    case actionTypes.SEARCH_SONG_SUCCESS:
      return searchSongSuccess(state, action);

    case actionTypes.SEARCH_SONG_ERROR:
      console.log(action);
      return searchSongError(state, action);

    default:
      return state;
  }
};

export default PlaylistReducer;
