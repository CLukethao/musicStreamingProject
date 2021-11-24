import React, {useEffect, useState} from 'react';


const UseYoutube = ({selectedSong, songHistory, setSong}) => {

    const [playerInfo, setPlayerInfo] = useState({
        indexInHistory: songHistory.length - 1,
        songLength: 0,
        currentPlayerTime: 0,
        playSong: true,
        songHistory: [],
        seekToTimer: false,
        repeat: false,
        timer: 0
    })

    const [player, setPlayer] = useState()

    useEffect(() => {
        setPlayerInfo(prevState => ({...prevState, indexInHistory: songHistory.length - 1}))

    }, [songHistory]);

    useEffect(() => {

        if (!window.YT) {

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        }

        else if (player === undefined) {

            loadVideo(selectedSong);

        }

        else {
            newSongSelected(selectedSong);
        }

    }, [selectedSong]);

    useEffect(() => {

        if (playerInfo.playSong && (playerInfo.currentPlayerTime < Math.floor(playerInfo.songLength))) {
            playerInfo.timer = setInterval(() => {
                setPlayerInfo(prevState => ({...prevState, currentPlayerTime: playerInfo.currentPlayerTime + 1}))
            }, 1000)
        }

        else if ((playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) && playerInfo.repeat) {
            rewind()
        }

        else if (playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) {
            clearInterval(playerInfo.timer)
            setPlayerInfo(prevState => ({...prevState, timer: 0, currentPlayerTime: 0, playSong: false}))
        }

        return () => {
            clearInterval(playerInfo.timer)
            setPlayerInfo(prevState => ({...prevState, timer: 0}))
        }

    }, [playerInfo.currentPlayerTime, playerInfo.playSong]);

    const loadVideo = (song) => {
        window.YT.ready ( () => {
            setPlayer(
                new window.YT.Player(`youtube-player`, {
                height: '1',
                width: '1',
                videoId: song.id.videoId,
                playerVars: { 'autoplay': 1, 'controls': 0, enablejsapi: 1},
                events: {
                    onReady: ((event) => onPlayerReady(event)),
                    onStateChange: (event => playerState(event))
                },
                })
            );
        })
    };

    const playerState = (event) => {
        if (event.data === 1) {
            setPlayerInfo(prevState => ({...prevState, playSong: true, songLength: event.target.getDuration()}))
        }
    }

    const onPlayerReady = (event) => {

        setPlayerInfo(prevState => ({...prevState, songLength: event.target.getDuration()}))

    }

    const play = () => {

        if (!playerInfo.playSong) {
            player.playVideo();
        }

        else {
            setPlayerInfo(prevState => ({...prevState, playSong: false}));
            player.pauseVideo();
        }
    }

    const newSongSelected = () => {
        try {
            player.loadVideoById({
                'videoId': selectedSong.id.videoId,
            })
        }

        catch {
            setTimeout(() => {
                player.loadVideoById({
                    'videoId': selectedSong.id.videoId,
                });
            }, 700)
        }

        setPlayerInfo(prevState => ({...prevState, currentPlayerTime: 0}));

    }

    const skipToPrev = () => {
        let indexOfNewSong = playerInfo.indexInHistory - 1;

        if (indexOfNewSong >= 0) {

            player.loadVideoById({
                'videoId': songHistory[indexOfNewSong].id.videoId
            });

            setPlayerInfo(prevState => ({...prevState, indexInHistory: playerInfo.indexInHistory - 1, currentPlayerTime: 0}));
            setSong(songHistory[indexOfNewSong]);
        }
    }

    const rewind = () => {
        setPlayerInfo(prevState => ({...prevState, currentPlayerTime: 0}));

        player.loadVideoById({
            'videoId': selectedSong.id.videoId
        });

    }

    const skipToNext = () => {
        let indexOfNewSong = playerInfo.indexInHistory + 1

        if (playerInfo.indexInHistory !== (songHistory.length - 1)) {
            player.loadVideoById({
                'videoId': songHistory[indexOfNewSong].id.videoId
            });

            setPlayerInfo(prevState => ({...prevState, indexInHistory: playerInfo.indexInHistory + 1, currentPlayerTime: 0}));
            setSong(songHistory[indexOfNewSong]);
        }
    }

    const seek = (e) => {
        player.seekTo(parseInt(e.target.value), true);
        setPlayerInfo(prevState => ({...prevState, seekToTimer: false}));
    }

    const seekTo = (e) => {
        if (!playerInfo.seekToTimer) {
            setPlayerInfo(prevState => ({...prevState, seekToTimer: setTimeout(() => seek(e), 1000)}));
            setPlayerInfo(prevState => ({...prevState, currentPlayerTime: parseInt(e.target.value)}));
        }

        else {
            clearTimeout(playerInfo.seekToTimer);
            setPlayerInfo(prevState => ({...prevState, currentPlayerTime: parseInt(e.target.value)}));
        }
    }

    const repeat = () => {
        setPlayerInfo(prevState => ({...prevState, repeat: !playerInfo.repeat}));
    }

    return (

        <div className='col-7'>
            <div className='row align-items-center'>
                <div className='col-4'>

                    <SkipBackward skipToPrev={skipToPrev} rewind={rewind}/>
                    <Play playSong={play} playPauseToggle={playerInfo.playSong}/>
                    <SkipForward skipToNext={skipToNext}/>
                    <Repeat repeat={repeat} toggled={playerInfo.repeat}/>
                    <div id='youtube-player' className='iframe'/>

                </div>

                <SongTimeline currentPlayerTime={playerInfo.currentPlayerTime} songLength={playerInfo.songLength} seekTo={seekTo} playing={playerInfo.playSong}/>
            </div>
        </div>

    );
}

export default UseYoutube;


const SkipBackward = ({skipToPrev, rewind}) => {

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
            <button id='rewind' className='btn player-btn' onClick={(event) => {rewind(); onRewind(event)}}>
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
            <button id='skipPrev' className='btn player-btn' onClick={event => {skipToPrev(); onRewind(event)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-skip-backward-fill" viewBox="0 0 16 16">
                    <path
                        d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
                </svg>
            </button>
        )
    }
}



const Play = ({playSong, playPauseToggle}) => {

    if (!playPauseToggle) {
        return (
            <button className='btn player-btn' onClick={() => playSong()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
            </button>
        )
    }

    else {
        return (
            <button className='btn player-btn' onClick={() => playSong()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-fill"
                     viewBox="0 0 16 16">
                    <path
                        d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                </svg>
            </button>
        )
    }
}


const SkipForward = ({skipToNext}) => {
    return (
        <button id='skipForward' className='btn player-btn' onClick={() => skipToNext()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-skip-end-fill" viewBox="0 0 16 16">
                <path
                    d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"/>
            </svg>
        </button>
    )
}

const Repeat = ({repeat, toggled}) => {

    if (!toggled) {
        return (
            <button className='btn player-btn' onClick={() => repeat()}>
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

    else {
        return (
                <button className='btn toggled' onClick={() => repeat()}>
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
}

const SongTimeline = ({currentPlayerTime, songLength, seekTo}) => {

    const secondsToMinutes = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

    return (
        <div className='col-8'>

            {secondsToMinutes(currentPlayerTime)}
            &nbsp;
            <input id='timeline' className='range' value={currentPlayerTime} type='range' step='1' min='0' max={songLength} onChange={e => seekTo(e)}/>
            &nbsp;
            {secondsToMinutes(songLength)}
        </div>

    )
}