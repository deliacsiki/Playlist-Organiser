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
  queueList: [],
  currentlyPlaying: null,
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
  });
};

const setActiveDevice = (state, { device }) => {
  return updateObject(state, {
    activeDevice: device,
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

const updateOneSongVotingList = (state, { song }) => {
  var votingListCopy = [...state.votingList];
  var songIndex = votingListCopy.findIndex((vsong) => vsong.id === song.id);
  if (songIndex != -1) votingListCopy[songIndex] = song;
  return updateObject(state, {
    votingList: votingListCopy,
  });
};

const updateQueueList = (state, { queueList }) => {
  return updateObject(state, {
    queueList: [...queueList],
  });
};
const updateCurrentlyPlaying = (state, { song }) => {
  return updateObject(state, {
    currentlyPlaying:
      song && Object.keys(song).length != 0 ? { ...song } : null,
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

    case actionTypes.SET_ACTIVE_DEVICE:
      return setActiveDevice(state, action);

    case actionTypes.ADD_NEW_SONG_TO_VOTING_LIST:
      return addSongToVotingList(state, action);

    case actionTypes.UPDATE_VOTING_LIST:
      return updateVotingList(state, action);

    case actionTypes.UPDATE_ONE_VOTING_LIST:
      return updateOneSongVotingList(state, action);

    case actionTypes.UPDATE_QUEUE_LIST:
      return updateQueueList(state, action);

    case actionTypes.UPDATE_CURRENTLY_PLAYING:
      return updateCurrentlyPlaying(state, action);

    default:
      return state;
  }
};

export default PlaylistReducer;
