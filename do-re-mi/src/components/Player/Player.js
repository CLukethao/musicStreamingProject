
import React from 'react'
import './styles.css'
import SongInformation from "./SongInformation/SongInformation";
import Controls from "./Controls/Controls";

const Player = ({song}) => {

    if (song.hasOwnProperty('snippet')) {
        return (
            <div className='container player vw-100 show'>
                <div className='row player vw-100 show'>
                    <div className='col-12'>



                        <SongInformation song={song}/>

                    </div>
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