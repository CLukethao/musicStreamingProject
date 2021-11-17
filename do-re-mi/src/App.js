import React, {useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";

const App = () => {

    const [currentState, setCurrentState] = useState({
        selectedSong: [],
        songHistory: [],
    })

    const selectedSong = (video) => {
        setCurrentState((currentState) => ({...currentState, selectedSong: video}));

        addToHistory(video)


    }

    const addToHistory = (video) => {
        console.log('current songHistory')
        console.log(currentState.songHistory)
        console.log(typeof currentState.songHistory)


        if (currentState.songHistory === undefined || currentState.songHistory.length === 0) {
            console.log('if statement')

            setCurrentState((currentState) => ({...currentState, songHistory: [video]}))


            console.log(currentState)
        }

        else if (currentState.songHistory.map(videoInHistory => videoInHistory.id.videoId).indexOf(video.id.videoId) !== -1) {
            console.log('else statement')
            console.log('map function')
            console.log(currentState.songHistory.map(videoInHistory => videoInHistory.id.videoId))
            console.log('index of videId')
            console.log(currentState.songHistory.map(videoInHistory => videoInHistory.id.videoId).indexOf(video.id.videoId))

            let selectedSongIndex = currentState.songHistory.map(video => video.id.videoId).indexOf(video.id.videoId);
            setCurrentState((currentState) => ({...currentState, songHistory: currentState.songHistory.splice(selectedSongIndex, 1)}))
        }

        else {

            console.log('else statement')
            console.log(video)
            setCurrentState( (currentState) => ({...currentState, songHistory: currentState.songHistory.push(video)}))
        }
    }

    console.log('finished running everything')
    console.log(currentState)

    return (
        <div className="">
            <Header />
            <Search selectedSong={selectedSong}/>
            <Player selectedSong={currentState.selectedSong}/>
        </div>
    );
}

export default App;
