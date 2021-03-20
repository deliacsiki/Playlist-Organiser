export const CLIENT_PORT = "3000";
export const SERVER_PORT = "8080";

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
export const DELETE_ROOM = LOCALHOST_URL + ROOM_ENDPOINT + "/{id}";
