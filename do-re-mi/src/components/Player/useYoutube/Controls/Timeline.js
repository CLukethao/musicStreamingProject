import React from "react";

const Timeline = ({ currentPlayerTime, songLength, seek}) => {

    const secondsToMinutes = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

    return (
        <span>
            {secondsToMinutes(currentPlayerTime)}
            &nbsp;
            <input id='timeline' className='timeline-range' value={currentPlayerTime} type='range' step='1' min='0' max={songLength} onMouseUp={event => seek(event)} onChange={event => seek(event)}/>
            &nbsp;
            {secondsToMinutes(songLength)}
        </span>

    )
}
export default Timeline