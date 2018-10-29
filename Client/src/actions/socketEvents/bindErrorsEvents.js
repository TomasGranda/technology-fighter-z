import {
	GET_ERRORS
} from "../types";

const handle_error = (payload, dispatch) => {
  payload.on("handle_error", err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  });
};

const connect_error = (payload, dispatch) => {
  payload.on("connect_error", err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  });
};

const socketEvents = [
  handle_error,
  connect_error
];

const bindErrorsEvents = (payload, dispatch, params) => {
  socketEvents.map(x => x(payload, dispatch, params));
};

export default bindErrorsEvents;