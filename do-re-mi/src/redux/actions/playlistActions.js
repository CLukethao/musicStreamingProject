
import * as api from '../../api';
import {CREATE_PLAYLIST, FETCH_ALL_PLAYLISTS} from "../constants/constantTypes";

export const getPlaylists = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPlaylists();

        dispatch({type: FETCH_ALL_PLAYLISTS, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const createPlaylist = (playlist) => async (dispatch) => {

    try {
        const { data } = await api.createPlaylist(playlist);

        dispatch({type: CREATE_PLAYLIST, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}