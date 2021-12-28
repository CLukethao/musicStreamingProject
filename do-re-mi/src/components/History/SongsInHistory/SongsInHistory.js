import React from "react";

const SongsInHistory = ({ songHistory, historyIndex, playSong }) => {

    const uploadDateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/
    console.log(songHistory)
    console.log(songHistory[historyIndex])
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
                                         className="bi bi-music-note-list" viewBox="0 0 16 16">
                                        <path
                                            d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                        <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                        <path fill-rule="evenodd"
                                              d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
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