
import React, {useState} from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {playlistSelected} from "../../redux/actions/actions";
import ListOfPlaylists from "./ListOfPlaylists/ListOfPlaylists";
import EditPlaylist from "./EditPlaylist/EditPlaylist";

const Playlists = () => {

    const dispatch = useDispatch()
    const playlists = useSelector((state) => state.playlists)

    const [editPlaylist, setEditPlaylist] = useState(null)

    const editBtn = (playlist, event) => {
        event.stopPropagation()
        setEditPlaylist(playlist)
        console.log(playlist)
    }

    const playlistSelect = (playlist) => {
        dispatch(playlistSelected(playlist));
    }

    if (editPlaylist === null) {
        return (
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-12 text-start title playlist-header'>
                            Playlists
                    </div>
                </div>

                <div className='row text-center'>
                    <ListOfPlaylists editBtn={editBtn} playlists={playlists} playlistSelect={playlistSelect}/>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className='container mt-4 '>
                <div className='row'>
                    <div className='col-12 text-start title playlist-header'>
                        Playlists/{editPlaylist.playlistName}
                    </div>
                </div>

                <div className='row text-center edit-container'>
                    <EditPlaylist editPlaylist={editPlaylist}/>
                </div>
            </div>
        )
    }
}

export default Playlists