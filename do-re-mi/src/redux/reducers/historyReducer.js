import {CREATE_HISTORY, UPDATE_HISTORYY, FETCH_HISTORY} from "../constants/constantTypes";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

const date = new Date();

const currentDate = monthNames[date.getMonth()]+ ' ' + date.getDate()

export default (state = {
    history: [],
    songSelected: {},
    currentDate: currentDate
}, action) => {
    switch (action.type) {

        case FETCH_HISTORY:
            console.log(action.payload.reverse())
            return {...state, history: action.payload}

        case CREATE_HISTORY:
            return {...state, history: [action.payload, ...state.history]}

        case UPDATE_HISTORYY:
            return {...state, history: state.history.map(date => date._id === action.payload._id ? action.payload : date)}

        // case SONG_SELECTED:
        //     return {...state, songSelected: action.payload}

        default:
            return state;
    }
}
