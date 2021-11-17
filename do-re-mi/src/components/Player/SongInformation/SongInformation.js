
import React from 'react'
import '../styles.css'

const SongInformation = ({selectedSong}) => {


        return (
            <div className='col-5'>
                <div className='row align-items-center'>
                    <div className='col-3 col-md-2  text-end player-thumbnail'>
                        <img className='player-img' src={selectedSong.snippet.thumbnails.medium.url}></img>
                    </div>

                    <div className='col-5 col-md-6 text-start player-title' data-bs-toggle="tooltip" title={selectedSong.snippet.title}>
                        {selectedSong.snippet.title}
                    </div>

                    <div className='col-4 col-md-2 text-start'>
                        <a className='player-title' href={`https://www.youtube.com/channel/${selectedSong.snippet.channelId}`}>{selectedSong.snippet.channelTitle}</a>
                    </div>
                </div>
            </div>
        )

}

export default SongInformation