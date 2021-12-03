
import React from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import UseYoutube from "./useYoutube/UseYoutube";
import {useDispatch, useSelector} from "react-redux";
import {songSelected} from "../../redux/actions/actions";



const Player = () => {

    const dispatch = useDispatch()
    const selectedSong = useSelector((state) => state.songSelected)
    const songHistory = useSelector((state) => state.songHistory)

    const changeSong = (song) => {
        dispatch(songSelected(song))
    }

    if (selectedSong.hasOwnProperty('snippet') && selectedSong.length !== 0) {
        return (
            <div className='container player vw-100 player-show text-center'>
                <div className='row player vw-100 player-show align-items-center'>
                    <UseYoutube selectedSong={selectedSong} songHistory={songHistory} setSong={changeSong}/>

                    <SongInformation selectedSong={selectedSong}/>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className='container player vw-100 player-hide'>
                <div className='row player vw-100 player-hide'>
                    <div className='col-12'>

                    </div>
                </div>
            </div>
        )
    }

}

export default Player