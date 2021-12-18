
import {
    ADD_PLAYLIST,
    UPDATE_PLAYLIST_SONGS,
    ADD_TO_QUEUE,
    REMOVE_FROM_QUEUE,
    SEARCH_SONG,
    SONG_SELECTED,
    UPDATE_HISTORY,
    PLAYLIST_SELECTED,
    UPDATE_USER_INFO
} from "../constants/constantTypes";

const history = {}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

for (let i = 0; i < 14; i++) {

    let date = new Date();

    date.setDate(date.getDate() - i)

    let keyForDate = monthNames[date.getMonth()] + date.getDate()

    history[keyForDate] = []
}

let date = new Date()
let keyForDate = monthNames[date.getMonth()] + date.getDate()

const reducer = (state = {
    user: {
        name: 'User Name',
        email: '123@123.com',
        password: 'password'
    },
    songHistory: history,
    songSelected: {},
    // playlistSelected: null,
    // searchResults: [],
    searchHistory: [],
    keyForDate: keyForDate,
    songsQueued: [],
    menuOpen: false,
    // playlists: [
    //     {
    //         playlistName: 'rnb',
    //         songs: []
    //     },
    //
    //     {
    //         playlistName: 'Country',
    //         songs: []
    //     },
    //
    //     {
    //         playlistName: 'Melodic',
    //         songs: []
    //     },
    //
    //     {
    //         playlistName: 'Dubstep wub',
    //         songs: []
    //     },
    //
    //     {
    //         playlistName: 'classical',
    //         songs: []
    //     }
    // ],

}, action) => {

    switch (action.type) {

        // case SEARCH_SONG:
        //     return {...state, searchResults: action.payload[0], searchHistory: [...state.searchHistory, action.payload[1]]}

        case UPDATE_HISTORY:
            return {...state, songHistory: {...state.songHistory, [keyForDate]: [...action.payload]}}

        case SONG_SELECTED:
            return {...state, songSelected: action.payload}

        // case ADD_PLAYLIST:
        //     return {...state, playlists: [...state.playlists, {playlistName: action.payload, songs: []}]}

        // case UPDATE_PLAYLIST_SONGS:
        //     return {...state, playlists: state.playlists.map(playlist => playlist.playlistName === action.payload.playlistName ? action.payload : playlist)}

        case ADD_TO_QUEUE:
            return {...state, songsQueued: [...state.songsQueued, action.payload]}

        case REMOVE_FROM_QUEUE:
            return {...state, songsQueued: action.payload}

        // case PLAYLIST_SELECTED:
        //     return {...state, playlistSelected: action.payload}

        case UPDATE_USER_INFO:
            return {...state, userInfo: action.payload}


        default: return state
    }
}

export default reducer