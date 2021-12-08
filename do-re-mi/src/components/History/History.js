import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import './styles.css'
import SongsInHistory from "./SongsInHistory/SongsInHistory";
import DateSelector from "./DateSelector/DateSelector";

const History = () => {

    const songHistory = useSelector((state) => state.songHistory)

    const [date, setDate] = useState(new Date())

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

    useEffect(() => {
        let currentDate = new Date()
        setDate(currentDate)
    }, [])

    const changeDate = (date) => {
        setDate(new Date(date))
    }

    return (
        <div className='container history-container'>
            <div className='row result-header mt-4 mb-2'>
                <div className='col-12 mb-4'>
                    History
                </div>

                <DateSelector monthNames={monthNames} date={date} changeDate={changeDate}/>

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

            <SongsInHistory date={date} songHistory={songHistory} />

        </div>

    )
}

export default History