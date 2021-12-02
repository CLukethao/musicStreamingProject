
import * as constantType from '../constants/constantTypes'

export const updateHistory = (songHistory, data) => async (dispatch) => {

    try {
        if (songHistory === undefined || songHistory.length === 0) {
            dispatch({type: constantType.UPDATE_HISTORY, payload: data})

        }

        else if (songHistory.map(songInHistory => songInHistory.id.videoId).indexOf(data.id.videoId) !== -1) {

        }

        else {
            dispatch({type: constantType.UPDATE_HISTORY, payload: data})
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
