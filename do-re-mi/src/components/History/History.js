import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import './styles.css'
import SongsInHistory from "./SongsInHistory/SongsInHistory";
import DateSelector from "./DateSelector/DateSelector";
import {songSelected, updateHistory} from "../../redux/actions/actions";

const History = () => {

    const dispatch = useDispatch()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

    const [date, setDate] = useState(new Date())

    let keyForDate = monthNames[date.getMonth()] + date.getDate()

    const songHistory = useSelector((state) => state.songHistory)

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
    }

    return (
        <div className='container history-container'>
            <div className='row result-header mt-4 mb-2'>
                <div className='col-12 mb-4'>
                    History
                </div>

                <DateSelector date={date} changeDate={changeDate} monthNames={monthNames}/>

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

            <SongsInHistory date={date} songHistory={songHistory[keyForDate]} playSong={playSong}/>

        </div>

    )
}

export default History