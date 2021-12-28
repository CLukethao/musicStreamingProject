
import * as api from '../../api';
import * as constantType from "../constants/constantTypes";

export const getPlaylists = (id) => async (dispatch) => {

    try {
        const { data } = await api.fetchPlaylists(id);

        dispatch({type: constantType.FETCH_ALL_PLAYLISTS, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const createPlaylist = (playlistName, id) => async (dispatch) => {

    try {
        const { data } = await api.createPlaylist({playlistName: playlistName, id: id});

        dispatch({type: constantType.CREATE_PLAYLIST, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const updatePlaylistSongs = (id, playlist) => async (dispatch) => {

    try {

        const { data } = await api.updatePlaylist({id: id, playlist: playlist});

        dispatch({type: constantType.UPDATE_PLAYLIST_SONGS, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const playlistSelected = (playlist) => async (dispatch) => {
    try {
        dispatch({type: constantType.PLAYLIST_SELECTED, payload: playlist})
    }

    catch (error) {
        console.log(error)
    }
}

export const deletePlaylist = (id, playlistId) => async (dispatch) => {

    try {
        const { data } = await api.deletePlaylist({id: id, playlistId: playlistId});
        dispatch({type: constantType.DELETE_PLAYLIST, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const clearPlaylist = () => async (dispatch) => {
    try {

        dispatch({type: constantType.CLEAR_PLAYLIST})
    }

    catch (error) {
        console.log(error)
    }
}