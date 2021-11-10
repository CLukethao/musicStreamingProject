
import React, {useState} from 'react'



const Controls = () => {

    const [songInfo, setSongInfo] = useState({
        songLength: 180,
        currentPlaybackTime: 20
    })

    const seekTo = (e) => {
        setSongInfo({...songInfo, currentPlaybackTime: e.target.value})
    }

    return (
        <div className='col-7'>
            <div className='row align-items-center'>
                <div className='col-4'>
                    <SkipBackward />
                    <Play />
                    <SkipForward />
                    <Repeat />

                </div>

                <SongTimeline currentPlaybackTime={songInfo.currentPlaybackTime} songLength={songInfo.songLength} seekTo={seekTo}/>
            </div>
        </div>
    )
}

const SkipBackward = () => {
    return (
        <button className='btn player-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-skip-start-fill" viewBox="0 0 16 16">
                <path
                    d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"/>
            </svg>
        </button>
    )
}

const Play = () => {
    return (
        <button className='btn player-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-play-fill" viewBox="0 0 16 16">
                <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
        </button>

    // <button className='btn player-btn'>
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-fill"
    //          viewBox="0 0 16 16">
    //         <path
    //             d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
    //     </svg>
    // </button>
    )
}


const SkipForward = () => {
     return (
         <button className='btn player-btn'>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-skip-end-fill" viewBox="0 0 16 16">
                 <path
                     d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"/>
             </svg>
         </button>
     )
}

const Repeat = () => {
 return (
     <button className='btn player-btn'>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              className="bi bi-arrow-repeat" viewBox="0 0 16 16">
             <path
                 d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
             <path fill-rule="evenodd"
                   d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
         </svg>
     </button>
 )
}

const SongTimeline = ({currentPlaybackTime, songLength, seekTo}) => {

    const secondsToMinutes = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

    return (
        <div className='col-8'>

            {secondsToMinutes(currentPlaybackTime)}
            &nbsp;
            <input id='timeline' className='range' value={currentPlaybackTime} type='range' step='1' min='0' max={songLength} onChange={e => seekTo(e)}/>
            &nbsp;
            {secondsToMinutes(songLength)}
        </div>

        )
}



// const Volume = () => {
//  return (
//      <button className='btn'>
//          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//               className="bi bi-volume-up-fill" viewBox="0 0 16 16">
//              <path
//                  d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
//              <path
//                  d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
//              <path
//                  d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
//          </svg>
//
//          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//               className="bi bi-volume-down-fill" viewBox="0 0 16 16">
//              <path
//                  d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
//          </svg>
//      </button>
//  )
// }



export default Controls