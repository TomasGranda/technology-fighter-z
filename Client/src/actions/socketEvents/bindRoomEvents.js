import {
  RECEIVE_MESSAGE,
  ENEMY_SELECT_CHARACTER,
  ENEMY_UNSELECT_CHARACTER,
  START_COUNTDOWN,
  STOP_COUNTDOWN,
  JOIN_ROOM
} from "../types";

const join_room = (payload, dispatch) => {
  payload.on("join_room", data => {
    dispatch({
      type: JOIN_ROOM,
      payload: data.roomId
    })
  });
};

const new_message = (payload, dispatch) => {
  payload.on("new_message", data => {
    dispatch({
      type: RECEIVE_MESSAGE,
      payload: data.message
    });
  });
};

const select_character = (payload, dispatch) => {
  payload.on("select_character", data => {
    dispatch({
      type: ENEMY_SELECT_CHARACTER,
      payload: data.characterId
    });
  });
};

const unselect_character = (payload, dispatch) => {
  payload.on("unselect_character", data => {
    dispatch({
      type: ENEMY_UNSELECT_CHARACTER,
    });
  });
};

const start_countdown = (payload, dispatch) => {
  payload.on("start_countdown", () => {
    dispatch({
      type: START_COUNTDOWN
    });
  });
};

const stop_countdown = (payload, dispatch) => {
  payload.on("stop_countdown", () => {
    dispatch({
      type: STOP_COUNTDOWN
    });
  });
};

const socketEvents = [
  join_room,
  new_message,
  select_character,
  unselect_character,
  start_countdown,
  stop_countdown
];

const bindRoomEvents = (payload, dispatch) => {
  socketEvents.map(x => x(payload, dispatch));
};

export default bindRoomEvents;