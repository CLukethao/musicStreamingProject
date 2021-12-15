
import React, {useState} from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {playlistSelected, songSelected, updatePlaylistSongs} from "../../redux/actions/actions";
import ListOfPlaylists from "./ListOfPlaylists/ListOfPlaylists";
import EditPlaylist from "./EditPlaylist/EditPlaylist";

const Playlists = () => {

    const dispatch = useDispatch()
    const playlists = useSelector((state) => state.playlists)
    const selectedPlaylist = useSelector((state) => state.playlistSelected)

    const [playlistToEdit, setPlaylistToEdit] = useState(null)

    const editPlaylistSongs = (songs) => {
        dispatch(updatePlaylistSongs({...playlists[playlistToEdit], songs: songs}))

        if (selectedPlaylist !== null && playlists[playlistToEdit] !== null) {
            if (selectedPlaylist.playlistName === playlists[playlistToEdit].playlistName) {
                dispatch(playlistSelected({...playlists[playlistToEdit], songs: songs}))
            }
        }
    }

    const editBtn = (index, event) => {
        event.stopPropagation()
        setPlaylistToEdit(index)
    }

    const goBack = () => {
        setPlaylistToEdit(null)
    }

    const playPlaylist = (playlist) => {
        if (playlist.songs.length > 0) {
            dispatch(songSelected(playlist.songs[0]))
            dispatch(playlistSelected(playlist));
        }
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
                    <div className='col-12 text-start title playlist-header'>
                        Playlists
                    </div>
                </div>

                <div className='row text-center'>
                    <ListOfPlaylists editBtn={editBtn} playlists={playlists} playPlaylist={playPlaylist}/>
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

                        <button onClick={event => goBack()}> hello </button>

                        <div className='row text-white'>
                            <div className='offset-4 col-4 offset-md-2 col-md-2 text-md-end'>
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
                </div>

                <EditPlaylist playlistToEdit={playlists[playlistToEdit]} editPlaylistSongs={editPlaylistSongs} playPlaylist={playPlaylist} playSong={playSong}/>

            </div>
        )
    }
}

export default Playlists