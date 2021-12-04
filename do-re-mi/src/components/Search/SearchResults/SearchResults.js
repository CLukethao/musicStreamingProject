import React from 'react'
import '../styles.css'

const SearchResults = ({songs, selectSong, addToPlaylist}) => {

    const results = []
    const dateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            results.push(
                <div className='results-display' key={songs[i].id.videoId} id={songs[i].id.videoId} onClick={() => selectSong(i)}>
                    <div className='row d-flex align-items-center'>
                        <div className='col-3 col-md-3 thumbnails'>
                            <img className='result-img' src={songs[i].snippet.thumbnails.medium.url} alt=''></img>
                        </div>

                        <div className='col-1'>
                            <button className='btn playlist-btn' onClick={() => addToPlaylist(songs[i])}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path
                                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
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