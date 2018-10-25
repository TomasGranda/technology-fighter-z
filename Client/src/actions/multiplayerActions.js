import { SELECT_MULTIPLAYER_CHARACTER, UNSELECT_MULTIPLAYER_CHARACTER, CREATE_SOCKET } from './types';

import io from 'socket.io-client';

import bindLobbyEvents from "./socketEvents/bindLobbyEvents";
import bindRoomEvents from "./socketEvents/bindRoomEvents";
import bindErrorsEvents from "./socketEvents/bindErrorsEvents";
import bindFightEvents from "./socketEvents/bindFightEvents";

export const createSocket = (username) => dispatch => {
	let payload = io()

	payload.on("connect", () => {
    payload.emit("change_username", { username: params.username });
    dispatch({
      type: CREATE_SOCKET,
      payload: payload
    });
  });

	const params = {
		username
	};
	
	bindLobbyEvents(payload, dispatch, params);
	bindRoomEvents(payload, dispatch, params);
	bindErrorsEvents(payload, dispatch, params);
	bindFightEvents(payload, dispatch, params);
};

export const unselectMultiplayerCharacter = (id, socket, roomId) => dispatch => {
	dispatch({
		type: UNSELECT_MULTIPLAYER_CHARACTER
	});
	socket.emit("unselect_character", { characterId: id, roomId });
};

export const selectMultiplayerCharacter = (id, socket, roomId) => dispatch => {
	dispatch({
		type: SELECT_MULTIPLAYER_CHARACTER,
		payload: id
	});
	
	socket.emit("select_character", { characterId: id, roomId });
};