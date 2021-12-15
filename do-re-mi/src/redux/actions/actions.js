
import * as constantType from '../constants/constantTypes'

export const updateHistory = (songHistory, data, keyForDate) => async (dispatch) => {

    let newHistory = songHistory

    try {

        if (songHistory[keyForDate] === undefined || songHistory[keyForDate].length === 0) {
            newHistory[keyForDate].push(data)

            dispatch({type: constantType.UPDATE_HISTORY, payload: newHistory[keyForDate]})
        }

        else if (songHistory[keyForDate].map(song => song.id.videoId).indexOf(data.id.videoId) !== -1) {

            let indexOfSongInHistory = songHistory[keyForDate].map(song => song.id.videoId).indexOf(data.id.videoId)
            newHistory[keyForDate].splice(indexOfSongInHistory, 1)
            newHistory[keyForDate].push(data)

            dispatch({type: constantType.UPDATE_HISTORY, payload: newHistory[keyForDate]})
        }

        else {
            newHistory[keyForDate].push(data)
            dispatch({type: constantType.UPDATE_HISTORY, payload: newHistory[keyForDate]})
        }

    }

    catch (error) {
        console.log(error)
    }
}

export const songSelected = (data) => ({
    type: constantType.SONG_SELECTED,
    payload: data
})

export const searchSong = (searchQuery) => async (dispatch) => {
    try {

        const API_KEY = 'AIzaSyDhjCec7htgsdItR9p2cwpJlduGvouQ9sg'
        // const API_KEY = 'AIzaSyDlnn9kjXhP8g6mrWbHZev0fivwxJQlOSA'

        const getURL = 'https://www.googleapis.com/youtube/v3/search?key='

        const data = await fetch(
            getURL + API_KEY + '&type=video&part=snippet&maxResults=14&q=' + searchQuery)
                .then((results) => {

                    return results.json()

                }).then((data) => {

                    return(data.items)

            })

        dispatch({type: constantType.SEARCH_SONG, payload: [data, searchQuery]})
    }

    catch (error) {
        console.log(error)
    }

}

export const addPlaylist = (data) => async (dispatch) => {
    try {
        dispatch({type: constantType.ADD_PLAYLIST, payload: data})
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

export const playlistSelected = (playlist) => async (dispatch) => {
    try {
        dispatch({type: constantType.PLAYLIST_SELECTED, payload: playlist})
    }

    catch (error) {
        console.log(error)
    }
}

export const addPlaylistSong = (playlist) => async (dispatch) => {

    try {
        dispatch({type: constantType.ADD_PLAYLIST_SONG, payload: playlist})
    }

    catch (error) {
        console.log(error)
    }
}

export const removePlaylistSong = (playlist) => async (dispatch) => {

    try {
        dispatch({type: constantType.REMOVE_PLAYLIST_SONG, payload: playlist})
    }

    catch (error) {
        console.log(error)
    }
}

export const menuOpen = (data) => async (dispatch) => {
    try {
        dispatch({type: constantType.MENU_OPEN, payload:data})
    }

    catch (error) {
        console.log(error)
    }


}