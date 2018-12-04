import {
  CREATE_SOCKET,
  ADD_CHALLENGE,
  REMOVE_CHALLENGE,
  RECEIVE_MESSAGE,
  SELECT_MULTIPLAYER_CHARACTER,
  UNSELECT_MULTIPLAYER_CHARACTER,
  ENEMY_SELECT_CHARACTER,
  ENEMY_UNSELECT_CHARACTER,
  GET_USERS,
  JOIN_ROOM,
  START_COUNTDOWN,
  STOP_COUNTDOWN,
  FIGHT_INIT,
  FIGHT_FINISH
} from "../actions/types";

const initialState = {
  socket: "",
  message: "",
  yourSelect: "",
  enemySelect: "",
  users: [],
  challenges: [],
  room: {
    joined: "",
    fight: {
      init: false
    },
    yourSelect: "",
    enemySelect: "",
    countdown: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case UNSELECT_MULTIPLAYER_CHARACTER:
      return {
        ...state,
        room: {
          ...state.room,
          yourSelect: ""
        }
      };
    case SELECT_MULTIPLAYER_CHARACTER:
      return {
        ...state,
        room: {
          ...state.room,
          yourSelect: action.payload
        }
      };
    case ENEMY_SELECT_CHARACTER:
      return {
        ...state,
        room: {
          ...state.room,
          enemySelect: action.payload
        }
      };
    case ENEMY_UNSELECT_CHARACTER:
      return {
        ...state,
        room: {
          ...state.room,
          enemySelect: ""
        }
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_CHALLENGE:
      return {
        ...state,
        challenges: [
          ...state.challenges,
          action.payload
        ]
      };
    case REMOVE_CHALLENGE:
      const filteredChallenges = state.challenges.filter(x => x.challengerId !== action.payload);
      return {
        ...state,
        challenges: [...filteredChallenges]
      };
    case START_COUNTDOWN:
      return {
        ...state,
        room: {
          ...state.room,
          countdown: true
        }
      };
    case STOP_COUNTDOWN:
      return {
        ...state,
        room: {
          ...state.room,
          countdown: false
        }
      };
    case JOIN_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          joined: action.payload
        }
      };
    case FIGHT_INIT:
      return {
        ...state,
        room: {
          ...state.room,
          fight: {
            ...state.fight,
            init: true
          }
        }
      };
    case FIGHT_FINISH:
      switch (action.payload) {
        case "change_characters":
          return {
            ...state,
            room: {
              ...state.room,
              yourSelect: "",
              enemySelect: "",
              fight: {
                ...state.fight,
                init: false
              },
              countdown: false
            }
          };
        case "rematch":
          return {
            ...state,
            room: {
              ...state.room,
              fight: {
                ...state.fight,
                init: false
              }
            }
          };
        default:
          return state;
      }
    default:
      return state;
  }
}