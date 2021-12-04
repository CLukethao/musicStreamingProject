import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";
import './styles.css';

const modalElement = document.getElementById('select-playlist-modal-root')

const PlaylistModal = ({ defaultOpened, song }, ref) => {

    const [isOpen, setIsOpen] = useState(defaultOpened)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }))

    const handleEscape = useCallback(event => {
        if (event.keyCode === 27) setIsOpen(false)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape, false)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, false)
        }
    }, [handleEscape, isOpen])

    const closeModal = () => {
        setIsOpen(false)
    }

    const [playlists, setPlaylists] = useState(
        [
            {
                playlistName: 'Edm',
                songs: []
            },

            {
                playlistName: 'Rap',
                songs: []
            },

            {
                playlistName: 'RNB',
                songs: []
            },

            {
                playlistName: 'Country',
                songs: []
            },

            {
                playlistName: 'Melodic',
                songs: []
            },

            {
                playlistName: 'Dubstep wub',
                songs: []
            }
        ]
    )

    const [existsInPlaylists, setExistsInPlaylists] = useState([])

    const [selectedPlaylists, setSelectedPlaylists] = useState([])

    useEffect(() => {

        let checkIfAdded = []

        console.log(checkIfAdded)

        for (let i = 0; i < playlists.length; i++) {
            for (let y = 0; y < playlists[i].songs.length; y++) {
                if (song.id.videoId === playlists[i].songs[y].id.videoId) {
                    checkIfAdded.push(playlists[i].playlistName)
                }
            }
        }

        console.log(checkIfAdded)

        setExistsInPlaylists(checkIfAdded)

        return () => {
            checkIfAdded = []
        }

    }, [isOpen])

    const selectPlaylists = (event) => {

        if (selectedPlaylists.includes(event.target.name)) {
            let newSelectedArray = selectedPlaylists
            let index = selectedPlaylists.indexOf(event.target.name)
            newSelectedArray.splice(index, 1)

            setSelectedPlaylists(newSelectedArray)
            console.log('removed')
        }

        else {
            setSelectedPlaylists(prevState => ([...prevState, event.target.name]))
        }
    }

    const addToPlaylist = () => {

        for (let i = 0; i < playlists.length; i++) {
            if (selectedPlaylists.includes(playlists[i].playlistName)) {
                let updatedPlaylists = playlists
                updatedPlaylists[i].songs.push(song)

                setPlaylists(updatedPlaylists)
            }
        }


    }

    return createPortal(
        isOpen ?
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

                        <div className='row justify-content-center'>
                            <div className='col-3 mt-3'>
                                <div className='row'>
                                    <button className='btn bg-primary text-white btn-login' onClick={addToPlaylist}>Update</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            : null, modalElement
    )

}

const DisplayPlaylists = ({playlists, onSelect, selectedPlaylists, alreadyExists }) => {

    return playlists.map(playlist => (
            <div className='form-check mb-3' key={playlist.playlistName}>
                <label className="">
                    {playlist.playlistName}
                </label>
                <input className="form-check-input" type="checkbox" defaultChecked={alreadyExists.includes(playlist.playlistName)} value={selectedPlaylists.includes(playlist.playlistName)} name={playlist.playlistName} onChange={event => onSelect(event)}/>
            </div>
        )
    )
}

export default forwardRef(PlaylistModal)