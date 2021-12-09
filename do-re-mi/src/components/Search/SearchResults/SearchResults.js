import React, {useState} from 'react'
import '../styles.css'
import addToQueue from '../../../images/add-to-queue.png'

const SearchResults = ({songs, playSong, addToPlaylist, addSongToQueue}) => {

    const results = []
    const dateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    const [addTo, setAddTo] = useState(false)

    const addToClicked = (i, event) => {
        event.stopPropagation()
        if (i !== addTo) {
            setAddTo(i)
        }

        else {
            setAddTo(false)
        }
    }

    const closeAddTo = () => {
        setAddTo(false)
    }

    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            results.push(
                <div className='results-display' key={songs[i].id.videoId} id={songs[i].id.videoId} onClick={() => playSong(songs[i])}>
                    <div className='row d-flex align-items-center'>
                        <div className='col-3 col-md-3 thumbnails'>
                            <img className='result-img' src={songs[i].snippet.thumbnails.medium.url} alt=''></img>
                        </div>

                        <div className='col-1' onMouseLeave={closeAddTo}>
                            <button className='btn playlist-btn' onClick={(event) => {addToClicked(i, event); event.currentTarget.blur()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path
                                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>

                            <div className={i === addTo ? 'add-to-container row' : 'collapse'}>

                                <div className='col-12 d-flex add-to-middle-border add-to-row' onClick={(event) => {addToPlaylist(songs[i], event); addToClicked(i, event)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg>

                                    &nbsp;

                                    Add to playlist
                                </div>

                                <div className='col-12 d-flex add-to-row' onClick={(event) => {addSongToQueue(songs[i], event); closeAddTo()}}>
                                    <img src={addToQueue}/>

                                    &nbsp;

                                    Queue next
                                </div>
                            </div>
                        </div>


                        <div className='col-4 col-md-3'>
                            {songs[i].snippet.title}
                        </div>

                        <div className='col-2 col-md-3'>
                            <a href={`https://www.youtube.com/channel/${songs[i].snippet.channelId}`} target="_blank">{songs[i].snippet.channelTitle}</a>
                        </div>

                        <div className='col-2 col-md-2'>
                            {songs[i].snippet.publishedAt.replace(dateRegex, "$2-$3-$1")}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='search-container'>
            <div className='row result-header mb-2'>
                <div className='offset-4 col-4 offset-md-3 col-md-2 text-md-end'>
                    Title
                </div>

                <div className='col-2 col-md-4 text-md-end'>
                    Uploaded by
                </div>

                <div className='col-2 col-md-3 text-md-center'>
                    Date
                </div>

            </div>

            {results}
        </div>

    )

}


export default SearchResults