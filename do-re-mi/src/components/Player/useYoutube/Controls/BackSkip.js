import React, {useEffect, useState} from "react";

const BackSkip = ({skipToPrev, rewind}) => {

    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {

        let timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevState => prevState - 1)
            }

            if (timeLeft === 0) {
                clearInterval(timer)
            }
        }, 100)

        return () => {
            clearInterval(timer)
        }

    })

    const onRewind = (event) => {

        if (event.target.id === 'rewind') {
            setTimeLeft(prevState => prevState + 6)
        }

        else {
            setTimeLeft(prevState => prevState + 3)
        }
    }

    if (!timeLeft) {
        return (
            <button id='rewind' className='btn player-btn' onClick={(event) => {rewind(); onRewind(event); event.currentTarget.blur()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-skip-start-fill" viewBox="0 0 16 16">
                    <path
                        d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"/>
                </svg>
            </button>
        )
    }

    else {
        return (
            <button id='skipPrev' className='btn player-btn' onClick={event => {skipToPrev(); onRewind(event); event.currentTarget.blur()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-skip-backward-fill" viewBox="0 0 16 16">
                    <path
                        d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
                </svg>
            </button>
        )
    }
}

export default BackSkip