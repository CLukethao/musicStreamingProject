import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import './styles.css'

const History = () => {

    const songHistory = useSelector((state) => state.songHistory)

    const uploadDateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    const [date, setDate] = useState(new Date())
    const [dayIndex, setDayIndex] = useState()
    const [historyResults, setHistoryResults] = useState()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];


    useEffect(() => {

        let results = []

        if (songHistory.length > 0) {

            for (let i = songHistory.length - 1; i >= 0; i-- ) {
                if (songHistory[i].dateListened.getDate() === date.getDate()) {
                    console.log('pushing')
                    results.push(
                        <div className='results-display' key={songHistory[i].songInformation.id.videoId} id={songHistory[i].songInformation.id.videoId}>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3 col-md-3 thumbnails'>
                                    <img className='result-img' src={songHistory[i].songInformation.snippet.thumbnails.medium.url} alt=''></img>
                                </div>

                                <div className='col-1'>
                                    <button className='btn playlist-btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-plus-square" viewBox="0 0 16 16">
                                            <path
                                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className='col-4 col-md-3'>
                                    {songHistory[i].songInformation.snippet.title}
                                </div>

                                <div className='col-2 col-md-3'>
                                    <a href={`https://www.youtube.com/channel/${songHistory[i].songInformation.snippet.channelId}`} target="_blank">{songHistory[i].songInformation.snippet.channelTitle}</a>
                                </div>

                                <div className='col-2 col-md-2'>
                                    {songHistory[i].songInformation.snippet.publishedAt.replace(uploadDateRegex, "$2-$3-$1")}
                                </div>
                            </div>
                        </div>
                    )
                }

                else {

                    setDayIndex(i)

                    break;
                }

                setHistoryResults(results)
            }
        }

    }, [date, songHistory])

    console.log(date)
    console.log(typeof date)


    return (
        <div className='container'>
            <div className='row result-header mt-4 mb-2'>
                <div className='col-12 mb-4'>
                    History
                </div>

                <DateScroller monthNames={monthNames} date={date}/>

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

            {historyResults}
        </div>

    )
}

const DateScroller = ({monthNames, date}) => {

    return (
        <div className='col-md-4 text-center'>
            <button className='btn date-btn secondary-date'>
                {monthNames[date.getMonth()] + ' ' + date.getDate()}
            </button>

            <button className='btn date-btn primary-date'>
                {monthNames[date.getMonth()] + ' ' + date.getDate()}
            </button>

            <button className='btn date-btn secondary-date'>
                {monthNames[date.getMonth()] + ' ' + date.getDate()}
            </button>
        </div>
    )
}

export default History