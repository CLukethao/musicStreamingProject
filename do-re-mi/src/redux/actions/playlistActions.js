
import * as api from '../../api';
import * as constantType from "../constants/constantTypes";

export const getPlaylists = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPlaylists();

        dispatch({type: constantType.FETCH_ALL_PLAYLISTS, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const createPlaylist = (playlist) => async (dispatch) => {

    try {
        const { data } = await api.createPlaylist(playlist);

        dispatch({type: constantType.CREATE_PLAYLIST, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const updatePlaylistSongs = (id, playlist) => async (dispatch) => {

    try {
        const { data } = await api.updatePlaylist(id, playlist);

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

export const deletePlaylist = (id) => async (dispatch) => {

    try {
        const { data } = await api.deletePlaylist(id);
        dispatch({type: constantType.DELETE_PLAYLIST, payload: data})
    }

    catch (error) {
        console.log(error)
    }

}