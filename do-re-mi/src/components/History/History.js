import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import './styles.css'
import SongsInHistory from "./SongsInHistory/SongsInHistory";
import DateSelector from "./DateSelector/DateSelector";
import { songSelected, updateHistory} from "../../redux/actions/actions";
import {playlistSelected} from "../../redux/actions/playlistActions";
import {updateHistoryy} from "../../redux/actions/historyActions";

const History = () => {

    const dispatch = useDispatch()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

    const [date, setDate] = useState(new Date())

    let keyForDate = monthNames[date.getMonth()] + date.getDate()

    const songHistory = useSelector((state) => state.reducer.songHistory)
    const history = useSelector((state) => state.history.history)
    const [historyIndex, setHistoryIndex] = useState(0)
    useEffect(() => {
        let currentDate = new Date()
        setDate(currentDate)
    }, [])

    const changeDate = (date) => {
        setDate(new Date(date))
    }

    const playSong = (song) => {
        dispatch(songSelected(song))
        dispatch(updateHistory(songHistory, song, keyForDate))
        dispatch(playlistSelected(null))

        dispatch(updateHistoryy(history[historyIndex]._id, history, song))
    }

    return (
        <div className='container history-container'>
            <div className='row result-header mt-4 mb-2'>
                <div className='col-12 mb-2 title'>
                    History
                </div>

                <DateSelector history={history} changeDate={changeDate}/>

                {/*<DateSelector date={date} changeDate={changeDate} monthNames={monthNames}/>*/}

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

            <SongsInHistory songHistory={history[historyIndex].songs} playSong={playSong}/>
            {/*<SongsInHistory date={date} songHistory={songHistory[keyForDate]} playSong={playSong}/>*/}

        </div>

    )
}

export default History