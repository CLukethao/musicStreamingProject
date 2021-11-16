
import React, {useEffect, useState} from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import Controls from "./Controls/Controls";
import UseYoutube from "./useYoutube/UseYoutube";


const Player = ({song}) => {

    const [songTrack, setSongTrack] = useState({
        song: '',
        songsPlayed: [],
        playSong: false,
    });

    const playSong = () => {
        setSongTrack({...songTrack, playSong: !songTrack.playSong})
        console.log(songTrack.playSong)
    }

    if (song.hasOwnProperty('snippet')) {
        return (
            <div className='container player vw-100 show'>
                <div className='row player vw-100 show align-items-center'>
                    <UseYoutube />

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