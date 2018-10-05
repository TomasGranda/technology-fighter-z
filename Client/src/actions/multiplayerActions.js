import {
    CREATE_SOCKET,
    RECIEVE_MESSAGE,
    UNSELECT_MULTIPLAYER_CHARACTER,
    SELECT_MULTIPLAYER_CHARACTER,
    ENEMY_SELECT_CHARACTER,
    GET_USERS,
    GET_ERRORS
} from "./types";

import io from 'socket.io-client';

export const createSocket = (ip, username) => dispatch => {
    let payload = io()//(ip !== "" ? ip : null));
    
    payload.on("new_message", data => {
        dispatch({
            type: RECIEVE_MESSAGE,
            payload: data.message
        });
    });

    payload.on("get_users", (data) => {
        dispatch({
            type: GET_USERS,
            payload: data.users
        });
    });

    /*payload.on("user_connected", () => {
        payload.emit("select_character", { characterId: getState() ? getState() : null });
    });*/

    payload.on("connect", () => {
        payload.emit("change_username", { username: username });
        payload.emit("get_users");
        dispatch({
            type: CREATE_SOCKET,
            payload: payload
        });
    });

    payload.on("select_character", data => {
        dispatch({
            type: ENEMY_SELECT_CHARACTER,
            payload: data.characterId
        });
    });

    payload.on("connect_error", err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    });

    payload.on("connect_timeout", () => {
        dispatch({
            type: GET_ERRORS,
            payload: "connection time out"
        });
    });
};

export const unselectMultiplayerCharacter = (id, socket) => dispatch => {
    dispatch({
        type: UNSELECT_MULTIPLAYER_CHARACTER,
        payload: id
    });
};

export const selectMultiplayerCharacter = (id, socket) => dispatch => {
    dispatch({
        type: SELECT_MULTIPLAYER_CHARACTER,
        payload: id
    });
    socket.emit("select_character", { characterId: id });
};