
import {SEARCH_SONG, SONG_SELECTED, UPDATE_HISTORY} from "../constants/constantTypes";


const reducer = (state = {
    songHistory: [],
    songSelected: {},
    searchResults: [],
    searchHistory: []
}, action) => {
    switch (action.type) {

        case SEARCH_SONG:
            return {...state, searchResults: action.payload[0], searchHistory: [...state.searchHistory, action.payload[1]]}

        case UPDATE_HISTORY:
            return {...state, songHistory: [...state.songHistory, action.payload]}

        case SONG_SELECTED:
            return {...state, songSelected: action.payload}


        default: return state
    }
}

export default reducer