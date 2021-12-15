import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import '../styles.css';
import {addPlaylist, removePlaylistSong, addPlaylistSong} from "../../../redux/actions/actions";

const modalElement = document.getElementById('select-playlist-modal-root')

const PlaylistModal = ({ song }, ref) => {

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }))

    const handleEscape = useCallback(event => {
        if (event.keyCode === 27) closeModal();
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape, false);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, false);
        }
    }, [handleEscape, isOpen])

    const closeModal = () => {
        setIsOpen(false)
    }

    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists);

    const [existsInPlaylists, setExistsInPlaylists] = useState([]);

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    useEffect(() => {

        let checkIfAdded = []

        if (song !== undefined) {
            for (let i = 0; i < playlists.length; i++) {
                for (let y = 0; y < playlists[i].songs.length; y++) {
                    if (song.id.videoId === playlists[i].songs[y].id.videoId) {
                        checkIfAdded.push(playlists[i].playlistName);
                    }
                }
            }
        }

        setExistsInPlaylists(checkIfAdded)
        setSelectedPlaylists(checkIfAdded)

    }, [isOpen])

    const selectPlaylists = (event) => {

        let playlist = event.target.name

        if (selectedPlaylists.includes(playlist)) {
            let newSelectedArray = [...selectedPlaylists];
            let index = newSelectedArray.indexOf(playlist);
            if (index !== -1) {
                newSelectedArray.splice(index, 1);
                setSelectedPlaylists(newSelectedArray);
            }

        }

        else {
            setSelectedPlaylists(prevState => ([...prevState, playlist]));
        }
    }

    const updatePlaylists = () => {

        for (let i = 0; i < playlists.length; i++) {
            if (selectedPlaylists.includes(playlists[i].playlistName) && !(existsInPlaylists.includes(playlists[i].playlistName))) {
                let updatedPlaylists = playlists;
                updatedPlaylists[i].songs.push(song);

                dispatch(addPlaylistSong(updatedPlaylists[i]));

            }

            else if (existsInPlaylists.includes(playlists[i].playlistName) && !(selectedPlaylists.includes(playlists[i].playlistName))) {
                let updatedPlaylists = playlists;
                let arrayOfSongs = updatedPlaylists[i].songs.map(song => {
                    return song.id.videoId
                })

                let indexOfSong = arrayOfSongs.indexOf(song.id.videoId);

                updatedPlaylists[i].songs.splice(indexOfSong, 1);

                dispatch(removePlaylistSong(updatedPlaylists[i]));

            }
        }

        closeModal()
    }

    const newPlaylist = (name) => {

        dispatch(addPlaylist(name));

    }

    return createPortal(isOpen ?
            <div className='container'>
                <div className='row modal d-flex justify-content-center'>
                    <div className='col-10 text-center text-white mt-5'>
                        <div className='row justify-content-center'>
                            <div className='offset-2 col-6 mb-3'>
                                <h1 className='playlist-modal-header'>Playlists</h1>
                            </div>

                            <div className='col-2 text-start'>
                                <button className='btn text-white' onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                        <path fill-rule="evenodd"
                                              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className='row justify-content-center' >
                            <div className='col-2 text-start text-white'>

                                <DisplayPlaylists playlists={playlists} onSelect={selectPlaylists} selectedPlaylists={selectedPlaylists} alreadyExists={existsInPlaylists}/>

                            </div>
                        </div>

                        <AddPlaylist newPlaylist={newPlaylist} playlists={playlists}/>

                        <div className='row justify-content-center'>
                            <div className='col-2 mt-3'>
                                <div className='row'>
                                    <button className='btn bg-primary text-white btn-login' onClick={updatePlaylists}>Update</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            : null, modalElement
    )

}

const DisplayPlaylists = ({playlists, onSelect, selectedPlaylists}) => {

    return playlists.map(playlist => (
            <div className='form-check mb-3' key={playlist.playlistName}>
                <label className="">
                    {playlist.playlistName}
                </label>
                <input className="form-check-input" type="checkbox" checked={selectedPlaylists.includes(playlist.playlistName)} name={playlist.playlistName} onChange={event => onSelect(event)}/>
            </div>
        )
    )
}

const AddPlaylist = ({newPlaylist, playlists}) => {

    const [isAddingPlaylist, setIsAddingPlaylist] = useState(false)

    const addingPlaylist = () => {
        setIsAddingPlaylist(prevState => !prevState)
    }

    const [newPlaylistName, setNewPlaylistName] = useState('')

    const [error, setError] = useState('')

    const confirm = () => {

        let arrayOfPlaylists = playlists.map(playlist => {
            return playlist.playlistName
        })

        if (newPlaylistName.length <= 0) {
            setError('Required')
        }

        else if (arrayOfPlaylists.includes(newPlaylistName)) {
            setError('Playlist already exists')
        }

        else {
            newPlaylist(newPlaylistName)
            setIsAddingPlaylist(false)
        }
    }

    const onPress = (event) => {
        if (event.key === 'Enter') {
            confirm()
        }
    }

    return (!isAddingPlaylist ?
        <div className='row justify-content-center add-playlist-container' onClick={addingPlaylist}>
            <div className='col-2 text-start text-white'>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>

                &nbsp;

                Add playlist

            </div>
        </div>

        :

        <div className='row justify-content-center add-playlist-container'>
            <div className='col-4 offset-2 text-start text-white'>
                <input type='text' className='text-input' value={newPlaylistName} onChange={(event) => setNewPlaylistName(event.target.value)} onKeyDown={event => onPress(event)}/>

                <button className='btn confirm-btn' onClick={confirm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path
                            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>

                <button className='btn cancel-btn' onClick={addingPlaylist}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fill-rule="evenodd"
                              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                </button>
            </div>

            <div className={error !== undefined ? 'row justify-content-center error' : 'row justify-content-center hidden'}>
                <div className='col-2 text-start'>
                    {error}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(PlaylistModal)