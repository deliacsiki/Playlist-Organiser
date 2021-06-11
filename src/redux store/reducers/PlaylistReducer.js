import * as actionTypes from "../ActionConstants";
import { updateObject } from "../../common/utilities";

const initialState = {
  loading: false,
  queue: null,
  searchedSongs: null,
  recommendedSongs: null,
  currentSong: null,
  error: null,
  lastFetchedSong: null,
  activeDevice: null,
  availableDevices: [],
  votingList: [],
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

const getTrackSuccess = (state, { song }) => {
  return updateObject(state, {
    lastFetchedSong: song,
    error: null,
    loading: false,
  });
};

const getAvailableDevices = (state, { devices }) => {
  return updateObject(state, {
    availableDevices: devices,
    activeDevice: devices.length === 1 ? devices[0] : null,
  });
};

const addSongToVotingList = (state, { item }) => {
  var votingListCopy = [...state.votingList];
  votingListCopy.push(item);
  return updateObject(state, {
    votingList: [...votingListCopy],
  });
};

const updateVotingList = (state, { votingList }) => {
  return updateObject(state, {
    votingList: [...votingList],
  });
};

const PlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_SONG_START:
      return searchSongStart(state);

    case actionTypes.SEARCH_SONG_SUCCESS:
      return searchSongSuccess(state, action);

    case actionTypes.SEARCH_SONG_ERROR:
      return searchSongError(state, action);

    case actionTypes.GET_TRACK_SUCCESS:
      return getTrackSuccess(state, action);

    case actionTypes.GET_AVAILABLE_DEVICES:
      return getAvailableDevices(state, action);

    case actionTypes.ADD_NEW_SONG_TO_VOTING_LIST:
      return addSongToVotingList(state, action);

    case actionTypes.UPDATE_VOTING_LIST:
      return updateVotingList(state, action);

    default:
      return state;
  }
};

export default PlaylistReducer;
