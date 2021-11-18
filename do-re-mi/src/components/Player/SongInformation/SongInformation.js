
import React from 'react'
import '../styles.css'

const SongInformation = ({songSelected}) => {


        return (
            <div className='col-5'>
                <div className='row align-items-center'>
                    <div className='col-3 col-md-2  text-end player-thumbnail'>
                        <img className='player-img' src={songSelected.snippet.thumbnails.medium.url}></img>
                    </div>

                    <div className='col-5 col-md-6 text-start player-title' data-bs-toggle="tooltip" title={songSelected.snippet.title}>
                        {songSelected.snippet.title}
                    </div>

                    <div className='col-4 col-md-2 text-start'>
                        <a className='player-title' href={`https://www.youtube.com/channel/${songSelected.snippet.channelId}`}>{songSelected.snippet.channelTitle}</a>
                    </div>
                </div>
            </div>
        )

}

export default SongInformation