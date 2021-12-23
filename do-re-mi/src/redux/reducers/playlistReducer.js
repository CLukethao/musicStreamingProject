import {
    CREATE_PLAYLIST, DELETE_PLAYLIST,
    FETCH_ALL_PLAYLISTS,
    PLAYLIST_SELECTED,
    UPDATE_PLAYLIST_SONGS
} from "../constants/constantTypes";

export default (state = {
    playlists: [],
    playlistSelected: null,
}, action) => {
    switch (action.type) {

        case FETCH_ALL_PLAYLISTS:
            return {...state, playlists: action.payload};

        case UPDATE_PLAYLIST_SONGS:
            return {...state, playlists: action.payload}

        case CREATE_PLAYLIST:
            return {...state, playlists: action.payload};

        case PLAYLIST_SELECTED:
            return {...state, playlistSelected: action.payload};

        case DELETE_PLAYLIST:
            return {...state, playlists: action.payload}

        default:
            return state;
    }
}