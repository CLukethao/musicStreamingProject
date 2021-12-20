import * as constantType from "../constants/constantTypes";
import * as api from "../../api";


export const getHistory = (currentDate) => async (dispatch) => {

    try {

        const { data } = await api.fetchHistory();

        if (data.length === 0 || data[data.length - 1].date !== currentDate) {
            dispatch(createHistory(currentDate))
        }

        else {
            dispatch({type: constantType.FETCH_HISTORY, payload: data})
        }

    }

    catch (error) {
        console.log(error)
    }

}

export const updateHistory = (id, history, songToAdd) => async (dispatch) => {

    let newHistory = history

    try {

        if (history.songs.map(song => song.id.videoId).indexOf(songToAdd.id.videoId) !== -1) {

            let indexOfSongInHistory = history.songs.map(song => song.id.videoId).indexOf(songToAdd.id.videoId)
            newHistory.songs.splice(indexOfSongInHistory, 1)
            newHistory.songs.push(songToAdd)

            const { data } = await api.updateHistory(id, newHistory);

            dispatch({type: constantType.UPDATE_HISTORY, payload: data})
        }

        else {
            newHistory.songs.push(songToAdd)

            const { data } = await api.updateHistory(id, newHistory);

            dispatch({type: constantType.UPDATE_HISTORY, payload: data})
        }
    }

    catch (error) {
        console.log(error)
    }
}

export const createHistory = (date) => async (dispatch) => {

    console.log(date)

    try {
        const { data } = await api.createHistory({date: date});

        dispatch ({type: constantType.CREATE_HISTORY, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

export const songSelected = (data) => ({
    type: constantType.SONG_SELECTED,
    payload: data
})


export const removeFromQueue = (songsQueued) => async (dispatch) => {
    let newSongsQueuedArray = songsQueued
    newSongsQueuedArray.shift()
    try {

        dispatch({type: constantType.REMOVE_FROM_QUEUE, payload: newSongsQueuedArray})
    }

    catch (error) {
        console.log(error)
    }
}


export const addToQueue = (data) => async (dispatch) => {

    try {
        dispatch({type: constantType.ADD_TO_QUEUE, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}
