import { CREATE_SOCKET, RECIEVE_MESSAGE, UNSELECT_MULTIPLAYER_CHARACTER, SELECT_MULTIPLAYER_CHARACTER, ENEMY_SELECT_CHARACTER, GET_USERS } from "../actions/types";

const initialState = {
    socket: "",
    message: "",
    yourSelect: "",
    enemySelect: "",
    users: []
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
                yourSelect: ""
            };
        case SELECT_MULTIPLAYER_CHARACTER:
            return {
                ...state,
                yourSelect: action.payload
            };
        case ENEMY_SELECT_CHARACTER:
            return {
                ...state,
                enemySelect: action.payload
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}