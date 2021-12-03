import React from 'react'
import '../styles.css'

const SearchResults = ({songs, selectSong}) => {

    const results = []
    const dateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            results.push(
                <div className='results-display' key={songs[i].id.videoId} id={songs[i].id.videoId} onClick={() => selectSong(i)}>
                    <div className='row d-flex align-items-center'>
                        <div className='col-3 col-md-4 thumbnails'>
                            <img className='result-img' src={songs[i].snippet.thumbnails.medium.url} alt=''></img>
                        </div>

                        <div className='col-5 col-md-3'>
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