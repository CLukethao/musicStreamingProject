
import React, {useEffect, useState} from 'react'
import placeholderImg from "../../../images/playlistPlaceholder.jpg";
import playlistIcon from "../../../images/playlist-icon.png";

const ListOfPlaylists = ({playlists, playPlaylist, editPlaylist, deletePlaylist}) => {

    const [playlistsDisplay, setPlaylistsDisplay] = useState()

    useEffect(() => {

        let listOfPlaylists = [];

        if (playlists.length > 0) {
            playlists.map((playlist, index) => {
                let image;

                if (playlist.songs.length > 0) {
                    image = playlist.songs[0].snippet.thumbnails.medium.url
                }

                else {
                    image = placeholderImg
                }

                let playlistName = playlist.playlistName
                let playlistLength = playlist.songs.length

                return listOfPlaylists.push(
                    <div className='col-3 text-white mt-4 d-flex justify-content-center' key={playlist._id}>
                        <div className='row playlists' onClick={(event) => playPlaylist(playlist)} >

                            <div className='col-12 playlist-img-container'>

                                <img className='playlists-img' src={image} alt='cover img of first video in playlist'/>

                                <div className='playlist-info-container'>
                                    <div className='playlist-info'>
                                        {playlistName}
                                        &nbsp;
                                        <img className='playlist-info-icon' src={playlistIcon} alt='playlist icon'/>
                                        {playlistLength}
                                    </div>

                                </div>
                            </div>

                            <div className='playlist-del-btn'>
                                <button className='btn text-danger' onClick={event => deletePlaylist(playlist._id, event)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className='playlist-play-icon text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>
                            </div>

                            <button className='btn text-white edit-playlist-btn' onClick={event => editPlaylist(index, event)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-pencil-square"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            })
        }

        setPlaylistsDisplay(listOfPlaylists)

    }, [playlists])

    if (playlistsDisplay) {
        return (
            playlistsDisplay
        )
    }

    else {
        return (
            <div>

            </div>
        )
    }
}

export default ListOfPlaylists