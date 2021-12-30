
import React, {useRef} from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import UseYoutube from "./useYoutube/UseYoutube";
import {useDispatch, useSelector} from "react-redux";
import PlaylistModal from "../Playlists/PlaylistModal/PlaylistModal";
import {updateHistory, removeFromQueue, songSelected} from "../../redux/actions/historyActions";

const Player = () => {

    const dispatch = useDispatch()
    const history = useSelector((state) => state.history.history[state.history.history.length - 1])
    const selectedSong = useSelector((state) => state.history.songSelected)
    const songsQueued = useSelector((state) => state.history.songsQueued)
    const playlistSelected = useSelector((state) => state.playlists.playlistSelected)
    const user = useSelector(state => state.user)

    const setSongSelected = (song) => {
        dispatch(songSelected(song))
    }

    const playlistModal = useRef(null)

    const addQueueToHistory = (song) => {
        dispatch(removeFromQueue(songsQueued))
        addSongToHistory(song)
    }

    const openPlaylistModal = () => {

        playlistModal.current.open()
    }

    const addSongToHistory = (song) => {
        dispatch(updateHistory(user._id, history, song))
    }

    if ((selectedSong.hasOwnProperty('snippet') && selectedSong.length !== 0) || playlistSelected !== null) {
        return (
            <div className='container player vw-100 player-show text-center'>
                <div className='row player vw-100 player-show align-items-center'>
                    <UseYoutube selectedSong={selectedSong} songHistory={history.songs} setSongSelected={setSongSelected} songsQueued={songsQueued} addQueToHistory={addQueueToHistory} playlistSelected={playlistSelected} addSongToHistory={addSongToHistory}/>

                    <div className='col-1'>
                        <button className='btn playlist-btn' onClick={openPlaylistModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-music-note-list" viewBox="0 0 16 16">
                                <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                                <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                <path fillRule="evenodd"
                                      d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
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