import {
    CREATE_HISTORY,
    UPDATE_HISTORY,
    FETCH_HISTORY,
    ADD_TO_QUEUE,
    REMOVE_FROM_QUEUE, SONG_SELECTED
} from "../constants/constantTypes";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

const date = new Date();

const currentDate = monthNames[date.getMonth()]+ ' ' + date.getDate()

export default (state = {
    history: [],
    songSelected: {},
    currentDate: currentDate,
    songsQueued: []
}, action) => {
    switch (action.type) {

        case FETCH_HISTORY:
            return {...state, history: action.payload}

        case CREATE_HISTORY:
            return {...state, history: [...state.history, action.payload]}

        case UPDATE_HISTORY:
            return {...state, history: state.history.map(date => date._id === action.payload._id ? action.payload : date)}

        case ADD_TO_QUEUE:
            return {...state, songsQueued: [...state.songsQueued, action.payload]}

        case REMOVE_FROM_QUEUE:
            return {...state, songsQueued: action.payload}

        case SONG_SELECTED:
            return {...state, songSelected: action.payload}

        default:
            return state;
    }
}
