import {
  RECIEVE_MESSAGE,
  ENEMY_SELECT_CHARACTER,
  ENEMY_UNSELECT_CHARACTER,
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
      type: RECIEVE_MESSAGE,
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

const socketEvents = [
  join_room,
  new_message,
  select_character,
  unselect_character
];

const bindRoomEvents = (payload, dispatch) => {
  socketEvents.map(x => x(payload, dispatch));
}

export default bindRoomEvents;