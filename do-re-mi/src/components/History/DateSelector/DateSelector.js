import React, {useEffect, useState} from "react";

const DateSelector = ({history, changeDate}) => {

    const [selectedDate, setSelectedDate] = useState(0)

    const selectDate = (event) => {
        setSelectedDate(parseInt(event.target.value))
    }

    console.log(history)

    return history.map((days, index) => (
        <button
            className={index === selectedDate ? 'btn date-btn primary-date'
                : index === (selectedDate + 1) ||  index === (selectedDate - 1) ? 'btn date-btn next-date' : 'btn date-btn hidden'
            }
            onClick={event => selectDate(event)}
            key={index}
            value={index}
        >

            {days.date}

        </button>
    ))
}

export default DateSelector


//
// const DateSelector = ({monthNames, changeDate}) => {
//
//     const [dates, setDates] = useState([])
//     const [selectedDate, setSelectedDate] = useState(0)
//
//     useEffect(() => {
//
//         for (let i = 0; i < 14; i++) {
//
//             let nextDate = new Date();
//
//             nextDate.setDate(nextDate.getDate() - i)
//
//             setDates(prevState => [...prevState, nextDate])
//         }
//
//         return () => {
//             setDates([])
//         }
//
//     }, [])
//
//     useEffect(() => {
//
//         changeDate(dates[selectedDate])
//
//     }, [selectedDate])
//
//     const selectDate = (event) => {
//         setSelectedDate(parseInt(event.target.value))
//     }
//
//     let datesArray = []
//
//     for (let i = (dates.length - 1); i >= 0; i--) {
//
//         datesArray.push(
//             <button
//                 className={i === selectedDate ? 'btn date-btn primary-date'
//                     : i === (selectedDate + 1) ||  i === (selectedDate - 1) ? 'btn date-btn next-date'
//                         : 'btn date-btn hidden'
//                 }
//                 onClick={event => selectDate(event)}
//                 key={dates[i].getDate()}
//                 value={i}
//             >
//
//                 {monthNames[dates[i].getMonth()] + ' ' + dates[i].getDate()}
//
//             </button>
//         )
//     }
//
//     return (
//
//         <div className='col-md-4 text-start'>
//             {datesArray}
//         </div>
//
//     )
// }
//
// export default DateSelector