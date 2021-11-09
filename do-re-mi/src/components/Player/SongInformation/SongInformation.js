
import React from 'react'
import '../styles.css'

const SongInformation = ({song}) => {


        return (
            <div className='row d-flex align-items-center'>
                <div className='col-3 col-md-4 offset-md-2 player-thumbnail text-end'>
                    <img className='player-img' src={song.snippet.thumbnails.medium.url}></img>
                </div>

                <div className='col-5 col-md-3 text-start player-title' data-bs-toggle="tooltip" title={song.snippet.title}>
                    {song.snippet.title}
                </div>

                <div className='col-2 col-md-3 text-start'>
                    <a href={`https://www.youtube.com/channel/${song.snippet.channelId}`}>{song.snippet.channelTitle}</a>
                </div>

            </div>
        )

}

export default SongInformation