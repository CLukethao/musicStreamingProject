import React, {useEffect, useState} from "react";

const SongsInHistory = ({date, songHistory}) => {

    const [indexOfSongs, setIndexOfSongs] = useState([])
    const uploadDateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    useEffect(() => {

        let results = []

        if (songHistory.length > 0) {

            for (let i = songHistory.length - 1; i >= 0; i-- ) {
                if (songHistory[i].dateListened.getDate() === date.getDate()) {
                    results.push(i)
                }
            }
        }

        setIndexOfSongs(results)

    }, [date, songHistory])

    return indexOfSongs.map(index => (
            <div className='results-display' key={songHistory[index].songInformation.id.videoId} id={songHistory[index].songInformation.id.videoId}>
                <div className='row d-flex align-items-center'>
                    <div className='col-3 col-md-3 thumbnails'>
                        <img className='result-img' src={songHistory[index].songInformation.snippet.thumbnails.medium.url} alt=''/>
                    </div>

                    <div className='col-1'>
                        <button className='btn playlist-btn'>
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
                        {songHistory[index].songInformation.snippet.title}
                    </div>

                    <div className='col-2 col-md-3'>
                        <a href={`https://www.youtube.com/channel/${songHistory[index].songInformation.snippet.channelId}`} target="_blank">{songHistory[index].songInformation.snippet.channelTitle}</a>
                    </div>

                    <div className='col-2 col-md-2'>
                        {songHistory[index].songInformation.snippet.publishedAt.replace(uploadDateRegex, "$2-$3-$1")}
                    </div>
                </div>
            </div>
        )
    )
}

export default SongsInHistory