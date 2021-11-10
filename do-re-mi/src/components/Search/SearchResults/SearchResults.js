import React, {useEffect} from 'react'
import '../styles.css'

const SearchResults = ({videos, onResultClick}) => {

    const results = []
    const dateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    if (videos) {
        for (let i = 0; i < videos.length; i++) {
            results.push(
                <div className='clickable-row' key={videos[i].id.videoId} id={videos[i].id.videoId} onClick={() => onResultClick(videos[i])}>
                    <div className='row results-display d-flex align-items-center'>
                        <div className='col-3 col-md-4 thumbnails'>
                            <img className='result-img' src={videos[i].snippet.thumbnails.medium.url} alt=''></img>
                        </div>

                        <div className='col-5 col-md-3'>
                            {videos[i].snippet.title}
                        </div>

                        <div className='col-2 col-md-3'>
                            <a href={`https://www.youtube.com/channel/${videos[i].snippet.channelId}`} target="_blank">{videos[i].snippet.channelTitle}</a>
                        </div>

                        <div className='col-2 col-md-2'>
                            {videos[i].snippet.publishedAt.replace(dateRegex, "$2-$3-$1")}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='search-container'>
            <div className='row result-header'>
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