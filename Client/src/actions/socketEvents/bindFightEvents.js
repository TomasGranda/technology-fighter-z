import {
	FIGHT_INIT
} from "../types";

const fight_init = (payload, dispatch) => {
  payload.on("fight_init", err => {
    dispatch({
      type: FIGHT_INIT
    });
  });
};

const socketEvents = [
  fight_init
];

const bindFightEvents = (payload, dispatch, params) => {
  socketEvents.map(x => x(payload, dispatch, params));
};

export default bindFightEvents;