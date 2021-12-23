import React from "react";

const DateSelector = ({history, changeDate, historyIndex}) => {


    return history.map((days, index) => (
        <button
            className={index === historyIndex ? 'btn date-btn primary-date'
                : index === (historyIndex + 1) ||  index === (historyIndex - 1) ? 'btn date-btn next-date' : 'btn date-btn hidden'
            }
            onClick={event => changeDate(event)}
            key={index}
            value={index}
        >

            {days.date}

        </button>
    ))

}

export default DateSelector