export const CLIENT_PORT = "3000";
export const SERVER_PORT = "8080";

export const HOST_IP = "192.168.0.132";
export const LOCALHOST_URL_CLIENT = `http://localhost:${CLIENT_PORT}`;
export const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;

export const LOCALHOST_IP = "127.0.0.1";
export const LOCALHOST_HOSTNAME = "localhost";

export const CLIENT_ID = "9017fcf689184a17959a0c9ebcf84d88";

export const AUTHORIZATION = LOCALHOST_URL + "/login";
export const GET_ACCESS_TOKEN = LOCALHOST_URL + "/gettoken";

// User
export const GET_USER_DATA = LOCALHOST_URL + "/getuser";

// Room
export const ROOM_ENDPOINT = "/room";
export const GET_ROOMS = LOCALHOST_URL + ROOM_ENDPOINT;
export const GET_ROOMS_BY_OWNER = GET_ROOMS + "/owner/{id}";
export const GET_ONE_ROOM = LOCALHOST_URL + ROOM_ENDPOINT + "/{id}";
export const CREATE_ROOM = LOCALHOST_URL + ROOM_ENDPOINT;
export const DELETE_ROOM = LOCALHOST_URL + ROOM_ENDPOINT + "/{id}";
export const GET_SHARED_ROOMS = GET_ROOMS + "/shared/{id}";
export const GET_ROOM_BY_CODE = GET_ROOMS + "/room-code/{id}";
export const JOIN_ROOM = GET_ONE_ROOM;
export const UNSUBSCRIBE_ROOM = GET_ROOMS + "/unsubscribe";

// Playlist
export const PLAYLIST_ENDPOINT = "/playlist";
export const SEARCH_FOR_SONG =
  LOCALHOST_URL + PLAYLIST_ENDPOINT + "/search/{:song}";
export const GET_SONG_BY_ID =
  LOCALHOST_URL + PLAYLIST_ENDPOINT + "/songs/{:id}";
export const PLAY_SONG = LOCALHOST_URL + PLAYLIST_ENDPOINT + "/songs/play";
export const GET_AVAILABLE_DEVICES =
  LOCALHOST_URL + PLAYLIST_ENDPOINT + "/devices";
