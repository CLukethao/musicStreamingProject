
import React, {useState} from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {updatePlaylistSongs, deletePlaylist} from "../../redux/actions/playlistActions";
import ListOfPlaylists from "./ListOfPlaylists/ListOfPlaylists";
import EditPlaylist from "./EditPlaylist/EditPlaylist";
import {playlistSelected} from "../../redux/actions/playlistActions";
import {songSelected} from "../../redux/actions/historyActions";

const Playlists = () => {

    const dispatch = useDispatch()
    const playlists = useSelector((state) => state.playlists.playlists)
    const selectedPlaylist = useSelector((state) => state.playlists.playlistSelected)
    const user = useSelector(state => state.user)

    const [playlistToEdit, setPlaylistToEdit] = useState(null)

    const editPlaylistSongs = (songs) => {

        let updatedPlaylist = {...playlists[playlistToEdit], songs: songs}
        let updatedPlaylistsArray = [...playlists.slice(0, playlistToEdit), updatedPlaylist, ...playlists.slice(playlistToEdit + 1)]

        dispatch(updatePlaylistSongs(user._id, updatedPlaylistsArray))

        if (selectedPlaylist !== null && playlists[playlistToEdit] !== null) {
            if (selectedPlaylist.playlistName === playlists[playlistToEdit].playlistName) {
                dispatch(playlistSelected({...playlists[playlistToEdit], songs: songs}))
            }
        }
    }

    const editPlaylist = (index, event) => {
        event.stopPropagation()
        if (playlists[index].songs.length > 0) {
            setPlaylistToEdit(index)
        }

    }

    const exitPlaylistEdit = () => {
        setPlaylistToEdit(null)
    }

    const playPlaylist = (playlist) => {
        if (playlist.songs.length > 0) {
            dispatch(songSelected(playlist.songs[0]))
            dispatch(playlistSelected(playlist));
        }
    }

    const deleteSelectedPlaylist = (id, event) => {
        event.stopPropagation(event)

        dispatch(deletePlaylist(user._id, id))
    }

    const playSong = (song, playlist) => {
        dispatch(songSelected(song));
        let playlistsArray = playlists.map(playlist => (playlist.playlistName))
        let playlistIndex = playlistsArray.indexOf(playlist)
        dispatch(playlistSelected(playlists[playlistIndex]))
    }

    if (playlistToEdit === null) {
        return (
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-12 text-start title playlist-header border-bottom pb-2'>
                        Playlists
                    </div>
                </div>

                <div className='row text-center'>
                    <ListOfPlaylists editPlaylist={editPlaylist} playlists={playlists} playPlaylist={playPlaylist} deletePlaylist={deleteSelectedPlaylist}/>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className='container mt-4 '>
                <div className='row'>
                    <div className='col-12 text-start title playlist-header'>
                        Playlists/{playlists[playlistToEdit].playlistName}
                    </div>

                    <div className='row text-white border-bottom playlist-header'>
                        <div className='col-1'>
                            <button className='btn text-white back-btn' onClick={() => exitPlaylistEdit()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </button>
                        </div>



                        <div className='offset-3 col-4 offset-md-2 col-md-2 text-md-end'>
                            Title
                        </div>

                        <div className='col-2 col-md-4 text-md-end'>
                            Uploaded by
                        </div>

                        <div className='col-2 col-md-3 text-md-center'>
                            Date
                        </div>
                    </div>
                </div>

                <EditPlaylist playlistToEdit={playlists[playlistToEdit]} editPlaylistSongs={editPlaylistSongs} playPlaylist={playPlaylist} playSong={playSong} />

            </div>
        )
    }
}

export default Playlists