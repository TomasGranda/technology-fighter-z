import {
  GET_USERS,
  ADD_CHALLENGE
} from "../types";

import store from '../../store';

const send_challenge = (payload, dispatch) => {
  payload.on("send_challenge", data => {
    if (!store.getState().multiplayer.challenges.find(x => x.challengerId === data.challengerId)) {
      dispatch({
        type: ADD_CHALLENGE,
        payload: data
      });
    }
  });
}

const get_users = (payload, dispatch) => {
  payload.on("get_users", (data) => {
    dispatch({
      type: GET_USERS,
      payload: data.users
    });
  });
};

const socketEvents = [
  get_users,
  send_challenge
];

const bindLobbyEvents = (payload, dispatch) => {
  socketEvents.map(x => x(payload, dispatch));
};

export default bindLobbyEvents;