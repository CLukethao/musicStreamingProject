
import React, {useRef} from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import UseYoutube from "./useYoutube/UseYoutube";
import {useDispatch, useSelector} from "react-redux";
import {removeFromQueue, songSelected, updateHistory} from "../../redux/actions/actions";
import PlaylistModal from "../Playlists/PlaylistModal/PlaylistModal";



const Player = () => {

    const dispatch = useDispatch()
    const selectedSong = useSelector((state) => state.songSelected)
    const keyForDate = useSelector((state) => state.keyForDate)
    const songHistory = useSelector((state) => state.songHistory)
    const songsQueued = useSelector((state) => state.songsQueued)

    const changeSong = (song) => {
        dispatch(songSelected(song))
    }

    const playlistModal = useRef(null)

    const addQueueToHistory = (song) => {
        dispatch(removeFromQueue(songsQueued))
        dispatch(updateHistory(songHistory, song, keyForDate))
    }

    const openPlaylistModal = () => {

        playlistModal.current.open()
    }

    if (selectedSong.hasOwnProperty('snippet') && selectedSong.length !== 0) {
        return (
            <div className='container player vw-100 player-show text-center'>
                <div className='row player vw-100 player-show align-items-center'>
                    <UseYoutube selectedSong={selectedSong} songHistory={songHistory[keyForDate]} setSong={changeSong} songsQueued={songsQueued} addQueToHistory={addQueueToHistory}/>

                    <div className='col-1'>
                        <button className='btn playlist-btn' onClick={openPlaylistModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                    </div>

                    <SongInformation selectedSong={selectedSong}/>

                </div>

                <PlaylistModal ref={playlistModal} song={selectedSong}/>
            </div>
        )
    }

    else {
        return (
            <div className='container player vw-100 player-hide'>
                <div className='row player vw-100 player-hide'>
                    <div className='col-12'>

                    </div>
                </div>
            </div>
        )
    }

}

export default Player