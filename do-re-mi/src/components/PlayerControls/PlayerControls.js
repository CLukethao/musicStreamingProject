
import React from 'react'
import './styles.css'

const PlayerControls = ({song}) => {

    if (song.hasOwnProperty('snippet')) {
        return (
            <div className='container player-controls'>
                <div className='row'>
                    <div className='col-12 player-controls'>
                        <div className='row'>
                            <div className='col-3 col-md-4 player-thumbnail'>
                                <img className='player-img' src={song.snippet.thumbnails.medium.url}></img>
                            </div>

                            <div className='col-5 col-md-3'>
                                {song.snippet.title}
                            </div>

                            <div className='col-2 col-md-3'>
                                <a href={`https://www.youtube.com/channel/${song.snippet.channelId}`}>{song.snippet.channelTitle}</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className='container player-controls'>
                <div className='row'>
                    <div className='col-12 player-controls'>
                        hello
                    </div>
                </div>
            </div>
        )
    }

}

export default PlayerControls