
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
            <div className='player vw-100 player-show'>
                <div className='row justify-content-center align-items-center'>
                    <UseYoutube selectedSong={selectedSong} songHistory={history.songs} setSongSelected={setSongSelected} songsQueued={songsQueued} addQueToHistory={addQueueToHistory} playlistSelected={playlistSelected} addSongToHistory={addSongToHistory}/>

                    <SongInformation selectedSong={selectedSong} openPlaylistModal={openPlaylistModal}/>

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