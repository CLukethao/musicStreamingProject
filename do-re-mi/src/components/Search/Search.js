import React, {useRef, useState} from 'react'
import './styles.css'
import SearchResults from "./SearchResults/SearchResults";
import PlaylistModal from "../Playlists/PlaylistModal/PlaylistModal";
import {useDispatch, useSelector} from "react-redux";
import {playlistSelected} from "../../redux/actions/playlistActions";
import {getSearch} from "../../redux/actions/searchActions";
import {updateHistory, addToQueue, songSelected} from "../../redux/actions/historyActions";

const Search = () => {

    const [inputData, setInputData] = useState({
        searchQuery: ''
    });

    const [addSongToPlaylist, setAddSongToPlaylist] = useState()

    const playlistModal = useRef(null)

    const openPlaylistModal = (song, event) => {
        event.stopPropagation()
        setAddSongToPlaylist(song)
        playlistModal.current.open()
    }

    const dispatch = useDispatch()

    const searchResults = useSelector((state) => state.searchResults)

    const history = useSelector((state) => state.history.history[state.history.history.length - 1])
    const user = useSelector(state => state.user)

    const searchForSong = () => {
        console.log(user)
        dispatch(getSearch(inputData.searchQuery))
    }

    const playSong = (song) => {
        dispatch(songSelected(song))
        dispatch(playlistSelected(null))
        dispatch(updateHistory(user._id, history, song))
    }

    const addSongToQueue = (song, event) => {
        event.stopPropagation()
        dispatch(addToQueue(song))
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            searchForSong()
        }
    }

    return (
        <div className='container'>
            <div className='row mb-5 mt-2'>
                <div className='col-6 offset-1 col-md-6 offset-md-3 mt-3 input-p'>
                    <input className='form-control' type='text' placeholder='Search' value={inputData.searchQuery} onChange={(e) => setInputData({...inputData, searchQuery: e.target.value})} onKeyDown={event => handleEnter(event)}/>
                </div>

                <div className='col-2 col-md-2 mt-3 btn-p'>
                    <button className='btn btn-block search-btn' onClick={event => {searchForSong(); event.currentTarget.blur()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-music-note-list" viewBox="0 0 16 16">
                            <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                            <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                            <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                            <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <SearchResults songs={searchResults} playSong={playSong} addToPlaylist={openPlaylistModal} addSongToQueue={addSongToQueue}/>

            <PlaylistModal ref={playlistModal} song={addSongToPlaylist}/>
        </div>
    )
}



export default Search