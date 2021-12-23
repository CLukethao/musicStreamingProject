import React from "react";

const SongsInHistory = ({ songHistory, historyIndex, playSong }) => {

    const uploadDateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    if (songHistory[historyIndex] !== undefined) {
            return songHistory[historyIndex].songs.slice(0).reverse().map(song => (
                    <div className='results-display' key={song.id.videoId} id={song.id.videoId} onClick={() => playSong(song)}>
                        <div className='row d-flex align-items-center'>
                            <div className='col-3 col-md-3 thumbnails'>
                                <img className='result-img' src={song.snippet.thumbnails.medium.url} alt=''/>
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
                                {song.snippet.title}
                            </div>

                            <div className='col-2 col-md-3'>
                                <a href={`https://www.youtube.com/channel/${song.snippet.channelId}`} target="_blank">{song.snippet.channelTitle}</a>
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