
import React, {useEffect} from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import Controls from "./Controls/Controls";
import {useYoutube} from "./useYoutube/useYoutube";


const Player = ({song}) => {

    const loadSong = () => {
        console.log('wassup')
    }

    useYoutube(loadSong)

    if (song.hasOwnProperty('snippet')) {
        return (
            <div className='container player vw-100 show'>
                <div className='row player vw-100 show align-items-center'>
                    <Controls />

                    <SongInformation song={song}/>

                </div>
            </div>
        )
    }

    else {
        return (
            <div className='container player vw-100 hide'>
                <div className='row player vw-100 hide'>
                    <div className='col-12'>

                    </div>
                </div>
            </div>
        )
    }

}

export default Player