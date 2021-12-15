import React, {useEffect, useState} from 'react';
import BackSkip from "./Controls/BackSkip";
import Play from "./Controls/PlayPause";
import ForwardSkip from "./Controls/ForwardSkip";
import Repeat from "./Controls/Repeat";
import Volume from "./Controls/Volume";
import Timeline from "./Controls/Timeline";


const UseYoutube = ({selectedSong, songHistory, setSongSelected, songsQueued, addQueToHistory, playlistSelected, addSongToHistory}) => {

    const [player, setPlayer] = useState()

    const [playerInfo, setPlayerInfo] = useState({
        playerHistory: songHistory,
        playlistSelected: playlistSelected,
        indexInHistory: songHistory.length - 1,
        songLength: 0,
        currentPlayerTime: 0,
        playSong: false,
        repeat: false,
        timelineTimer: 0,
        volume: 100,
        seeking: false,
        muted: false
    })

    useEffect(() => {

        if (playlistSelected !== null) {
            if (playerInfo.playlistSelected === playlistSelected.playlistName) {

                setPlayerInfo(prevState => ({...prevState, playerHistory: playlistSelected.songs, indexInHistory: playlistSelected.songs.map(song => (song.id.videoId)).indexOf(selectedSong.id.videoId)}));
            }

            else {

                setPlayerInfo(prevState => ({...prevState, indexInHistory: 0, playerHistory: playlistSelected.songs, playlistSelected: playlistSelected.playlistName, repeat: 'all', currentPlayerTime: 0}));
            }
        }

        else {
            setPlayerInfo(prevState => ({...prevState, indexInHistory: songHistory.length - 1, playerHistory: songHistory, playlistSelected: null, repeat: false}))
        }

    }, [songHistory, playlistSelected]);

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

        if ((playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) && playerInfo.repeat === 'one') {
            rewind()
        }

        else if ((playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) && songsQueued.length > 0) {
            setSongSelected(songsQueued[0])
            addQueToHistory(songsQueued[0])
        }

        else if ((playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) && playerInfo.repeat === 'all') {
            skipToNext()
        }

        else if (playerInfo.playSong && (playerInfo.currentPlayerTime < Math.floor(playerInfo.songLength))) {

            playerInfo.timelineTimer = setInterval(() => {
                setPlayerInfo(prevState => ({...prevState, currentPlayerTime: playerInfo.currentPlayerTime + 1}))
            }, 1000)
        }

        else if (playerInfo.currentPlayerTime === Math.floor(playerInfo.songLength)) {

            clearInterval(playerInfo.timelineTimer)
            setPlayerInfo(prevState => ({...prevState, timelineTimer: 0, currentPlayerTime: 0, playSong: false}))
        }

        return () => {
            clearInterval(playerInfo.timelineTimer)
            setPlayerInfo(prevState => ({...prevState, timelineTimer: 0}))
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

        if (playerInfo.playlistSelected !== null) {
            if (indexOfNewSong >= 0) {

                addSongToHistory(playerInfo.playerHistory[indexOfNewSong])
            }

            else {
                addSongToHistory(playerInfo.playerHistory[playerInfo.playerHistory.length - 1])
            }
        }

        if (indexOfNewSong >= 0) {

            setPlayerInfo(prevState => ({...prevState, indexInHistory: playerInfo.indexInHistory - 1, currentPlayerTime: 0}));

            setSongSelected(playerInfo.playerHistory[indexOfNewSong]);
        }

        else if (playerInfo.playerHistory.length > 1) {

            setPlayerInfo(prevState => ({...prevState, indexInHistory: playerInfo.playerHistory.length - 1, currentPlayerTime: 0}));

            setSongSelected(playerInfo.playerHistory[playerInfo.playerHistory.length - 1]);

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

        if (playerInfo.playlistSelected !== null) {
            if (playerInfo.indexInHistory !== (playerInfo.playerHistory.length - 1)) {

                addSongToHistory(playerInfo.playerHistory[playerInfo.indexInHistory + 1]);
            }

            else {
                addSongToHistory(playerInfo.playerHistory[0]);
            }
        }

        if (songsQueued.length > 0) {
            setSongSelected(songsQueued[0]);
            addQueToHistory(songsQueued[0]);
        }

        else if (playerInfo.indexInHistory !== (playerInfo.playerHistory.length - 1)) {

            setPlayerInfo(prevState => ({...prevState, indexInHistory: playerInfo.indexInHistory + 1, currentPlayerTime: 0}));
            setSongSelected(playerInfo.playerHistory[indexOfNewSong]);
        }

        else {
            setPlayerInfo(prevState => ({...prevState, indexInHistory: 0, currentPlayerTime: 0}));
            setSongSelected(playerInfo.playerHistory[0]);
        }
    }

    const seek = (event) => {

        if (event.type === 'mouseup') {
            player.seekTo(playerInfo.currentPlayerTime)
        }

        else {
            setPlayerInfo(prevState => ({...prevState, currentPlayerTime: parseInt(event.target.value)}))
        }
    }

    const toggleRepeat = () => {
        if (playerInfo.repeat === false) {
            setPlayerInfo(prevState => ({...prevState, repeat: 'all'}));
        }

        else if (playerInfo.repeat === 'all') {
            setPlayerInfo(prevState => ({...prevState, repeat: 'one'}));
        }

        else {
            setPlayerInfo(prevState => ({...prevState, repeat: false}));
        }
    }

    const changeVol = (event) => {
        player.setVolume(parseInt(event.target.value))

        setPlayerInfo(prevState => ({...prevState, volume: parseInt(event.target.value)}))
    }

    const mute = () => {

        if (!playerInfo.muted) {
            player.mute()

            setPlayerInfo(prevState => ({...prevState, muted: true}))
        }

        else {
            player.unMute()

            setPlayerInfo(prevState => ({...prevState, muted: false}))
        }
    }

    return (

        <div className='col-7'>
            <div className='row align-items-center'>
                <div className='col-4'>
                    <BackSkip skipToPrev={skipToPrev} rewind={rewind}/>
                    <Play playSong={play} playPauseToggle={playerInfo.playSong}/>
                    <ForwardSkip skipToNext={skipToNext}/>
                    <Repeat toggleRepeat={toggleRepeat} repeat={playerInfo.repeat}/>
                    <Volume mute={mute} muted={playerInfo.muted} volume={playerInfo.volume} changeVol={changeVol}/>
                    <div id='youtube-player' className='iframe'/>
                </div>

                <Timeline currentPlayerTime={playerInfo.currentPlayerTime} songLength={playerInfo.songLength} seek={seek}/>
            </div>
        </div>

    );
}

export default UseYoutube;