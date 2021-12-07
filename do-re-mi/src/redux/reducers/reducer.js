
import {
    ADD_PLAYLIST,
    ADD_SONG_TO_PLAYLIST,
    SEARCH_SONG,
    SONG_SELECTED,
    UPDATE_HISTORY
} from "../constants/constantTypes";



const reducer = (state = {
    songHistory: [],
    songSelected: {},
    searchResults: [],
    searchHistory: [],
    playlists: [
        {
            playlistName: 'rnb',
            songs: []
        },

        {
            playlistName: 'Country',
            songs: []
        },

        {
            playlistName: 'Melodic',
            songs: []
        },

        {
            playlistName: 'Dubstep wub',
            songs: []
        },

        {
            playlistName: 'classical',
            songs: []
        }
    ]

}, action) => {

    switch (action.type) {

        case SEARCH_SONG:
            return {...state, searchResults: action.payload[0], searchHistory: [...state.searchHistory, action.payload[1]]}

        case UPDATE_HISTORY:
            return {...state, songHistory: [...state.songHistory, action.payload]}

        case SONG_SELECTED:
            return {...state, songSelected: action.payload}

        case ADD_PLAYLIST:
            return {...state, playlists: [...state.playlists, {playlistName: action.payload, songs: []}]}

        case ADD_SONG_TO_PLAYLIST:
            return {...state, playlists: action.payload}

        default: return state
    }
}

export default reducer