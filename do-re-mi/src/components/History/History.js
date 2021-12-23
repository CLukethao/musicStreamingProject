import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import './styles.css'
import SongsInHistory from "./SongsInHistory/SongsInHistory";
import DateSelector from "./DateSelector/DateSelector";
import {playlistSelected} from "../../redux/actions/playlistActions";

import {updateHistory, songSelected} from "../../redux/actions/historyActions";

const History = () => {

    const dispatch = useDispatch()

    const history = useSelector((state) => state.history.history)
    const user = useSelector(state => state.user)

    const [historyIndex, setHistoryIndex] = useState(0)

    useEffect(() => {
        setHistoryIndex(history.length - 1)
    }, [history])

    const changeDate = (event) => {
        setHistoryIndex(parseInt(event.target.value))
    }

    const playSong = (song) => {
        dispatch(songSelected(song))
        dispatch(playlistSelected(null))
        dispatch(updateHistory(user._id, history[history.length - 1], song))
    }

    return (
        <div className='container history-container'>
            <div className='row result-header mt-4 mb-2'>
                <div className='col-12 mb-2 title'>
                    History
                </div>

                <div className='col-md-4 text-start'>
                    <DateSelector history={history} changeDate={changeDate} historyIndex={historyIndex}/>
                </div>

                <div className='col-4 col-md-2 text-md-center'>
                    Title
                </div>

                <div className='col-2 col-md-4 text-md-center'>
                    Uploaded by
                </div>

                <div className='col-2 col-md-2 text-md-center'>
                    Date
                </div>
            </div>

            <SongsInHistory songHistory={history} historyIndex={historyIndex} playSong={playSong}/>

        </div>

    )
}

export default History