import React, {useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import './styles.css'
import SongsInHistory from "./SongsInHistory/SongsInHistory";
import DateSelector from "./DateSelector/DateSelector";
import {playlistSelected} from "../../redux/actions/playlistActions";

import {updateHistory, songSelected, addToQueue} from "../../redux/actions/historyActions";
import PlaylistModal from "../Playlists/PlaylistModal/PlaylistModal";

const History = () => {

    const dispatch = useDispatch()

    const history = useSelector((state) => state.history.history)
    const user = useSelector(state => state.user)

    const [historyIndex, setHistoryIndex] = useState(0)

    useEffect(() => {
        setHistoryIndex(history.length - 1)
    }, [history])

    const changeDate = (event) => {
        setHistoryIndex(parseInt(event.target.value))
    }

    const playSong = (song) => {
        dispatch(songSelected(song))
        dispatch(playlistSelected(null))
        dispatch(updateHistory(user._id, history[history.length - 1], song, user.token))
    }

    const playlistModal = useRef(null)

    const [addSongToPlaylist, setAddSongToPlaylist] = useState()

    const openPlaylistModal = (song, event) => {
        event.stopPropagation()
        setAddSongToPlaylist(song)
        playlistModal.current.open()
    }

    const addSongToQueue = (song, event) => {
        event.stopPropagation()
        dispatch(addToQueue(song))
    }

    return (
        <div className='container history-container'>
            <div className='row result-header mt-4 mb-2 align-items-center'>
                <div className='col-12 mb-2 page-title title'>
                    History
                </div>

                <div className='col-5 col-md-4 text-start'>
                    <DateSelector history={history} changeDate={changeDate} historyIndex={historyIndex}/>
                </div>

                <div className='col-3 col-md-2 text-md-center'>
                    Title
                </div>

                <div className='col-2 col-md-4 text-md-center'>
                    Uploaded by
                </div>

                <div className='col-2 col-md-2 text-md-center'>
                    Date
                </div>
            </div>

            <SongsInHistory songHistory={history} historyIndex={historyIndex} playSong={playSong} addToPlaylist={openPlaylistModal} addSongToQueue={addSongToQueue}/>

            <PlaylistModal ref={playlistModal} song={addSongToPlaylist}/>
        </div>

    )
}

export default History