import React, {useState} from "react";
import addToQueue from "../../../images/add-to-queue.png";

const SongsInHistory = ({ songHistory, historyIndex, playSong, addToPlaylist, addSongToQueue }) => {

    const uploadDateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    const [addTo, setAddTo] = useState(false)

    const addToClicked = (song, event) => {
        event.stopPropagation()
        if (song !== addTo) {
            setAddTo(song)
        }

        else {
            setAddTo(false)
        }
    }

    const closeAddTo = () => {
        setAddTo(false)
    }

    if (songHistory[historyIndex] !== undefined) {
            return songHistory[historyIndex].songs.slice(0).reverse().map(song => (
                    <div className='results-display' key={song.id.videoId} id={song.id.videoId} onClick={() => playSong(song)}>
                        <div className='row d-flex align-items-center'>
                            <div className='col-3 col-md-3 thumbnails'>
                                <img className='result-img' src={song.snippet.thumbnails.medium.url} alt=''/>
                            </div>

                            <div className='col-1 offset-md-0 col-md-1' onMouseLeave={() => closeAddTo()}>
                                <button className='btn playlist-btn' onClick={(event) => {addToClicked(song.id.videoId, event); event.currentTarget.blur()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-music-note-list" viewBox="0 0 16 16">
                                        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                        <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                                        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                        <path fillRule="evenodd"
                                              d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </button>

                                <div className={song.id.videoId === addTo ? 'add-to-container row' : 'collapse'}>

                                    <div className='col-12 d-flex add-to-middle-border add-to-row' onClick={(event) => {addToPlaylist(song, event); addToClicked(song.id.videoId, event)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                        </svg>

                                        &nbsp;

                                        Add to playlist
                                    </div>

                                    <div className='col-12 d-flex add-to-row' onClick={(event) => {addSongToQueue(song, event); closeAddTo()}}>
                                        <img src={addToQueue} alt='add to queue or playlist icon'/>

                                        &nbsp;

                                        Queue next
                                    </div>
                                </div>
                            </div>

                            <div className='col-4 col-md-3'>
                                {song.snippet.title}
                            </div>

                            <div className='col-2 col-md-3'>
                                <a href={`https://www.youtube.com/channel/${song.snippet.channelId}`} target="_blank" rel="noreferrer">{song.snippet.channelTitle}</a>
                            </div>

                            <div className='col-2 col-md-2'>
                                {song.snippet.publishedAt.replace(uploadDateRegex, "$2-$3-$1")}
                            </div>
                        </div>
                    </div>
                )
            )
    }

    else {
        return (
            <div>

            </div>
        )
    }
}

export default SongsInHistory