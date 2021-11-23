
import React from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import UseYoutube from "./useYoutube/UseYoutube";


const Player = ({songSelected, songHistory, setSong}) => {

    if (songSelected.hasOwnProperty('snippet')) {
        if (songSelected.hasOwnProperty('snippet')) {
            return (
                <div className='container player vw-100 show'>
                    <div className='row player vw-100 show align-items-center'>
                        <UseYoutube songSelected={songSelected} songHistory={songHistory} setSong={setSong}/>

                        <SongInformation songSelected={songSelected}/>
                    </div>
                </div>
            )
        }
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