
import React from 'react'
import '../styles.css'

const SongInformation = ({selectedSong}) => {


        return (
            <div className='col-4'>
                <div className='row align-items-center'>

                    <div className='col-3 col-md-3  text-end player-thumbnail'>
                        <img className='player-img' src={selectedSong.snippet.thumbnails.medium.url} alt='video cover'/>
                    </div>

                    <div className='col-5 col-md-9 text-start player-title' data-bs-toggle="tooltip" title={selectedSong.snippet.title}>
                        {selectedSong.snippet.title}

                        <a className='player-title' href={`https://www.youtube.com/channel/${selectedSong.snippet.channelId}`}>{selectedSong.snippet.channelTitle}</a>

                    </div>
                </div>
            </div>
        )

}

export default SongInformation