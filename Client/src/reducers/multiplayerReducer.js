import {
    CREATE_SOCKET,
    ADD_CHALLENGE,
    RECIEVE_MESSAGE,
    SELECT_MULTIPLAYER_CHARACTER,
    UNSELECT_MULTIPLAYER_CHARACTER,
    ENEMY_SELECT_CHARACTER,
    ENEMY_UNSELECT_CHARACTER,
    GET_USERS,
    JOIN_ROOM
} from "../actions/types";

const initialState = {
    socket: "",
    message: "",
    yourSelect: "",
    enemySelect: "",
    users: [],
    challenges: [],
    room: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        case RECIEVE_MESSAGE:
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
        case JOIN_ROOM:
            return {
                ...state,
                room: {
                    ...state.room,
                    joined: action.payload
                }
            }
        default:
            return state;
    }
}