
import React from 'react'
import '../styles.css'

const SongInformation = ({selectedSong, openPlaylistModal}) => {


        return (
            <div className='order-1 order-lg-2 mb-2 mb-lg-0 col-12 col-lg-5 player-info-container'>
                <div className='row align-items-center'>
                    <div className='col-3' style={{maxWidth: '155px', minWidth: '155px'}}>
                        <button className='btn playlist-btn' onClick={() => openPlaylistModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-music-note-list" viewBox="0 0 16 16">
                                <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                                <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                <path fillRule="evenodd"
                                      d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </button>



                        <img className='player-img' src={selectedSong.snippet.thumbnails.medium.url} alt='video cover'/>
                    </div>

                    <div className='col-4 player-title' data-bs-toggle="tooltip" title={selectedSong.snippet.title}>
                            {selectedSong.snippet.title}
                    </div>


                    <a className='col-4' href={`https://www.youtube.com/channel/${selectedSong.snippet.channelId}`}>{selectedSong.snippet.channelTitle}</a>

                </div>

            </div>
        )

}

export default SongInformation