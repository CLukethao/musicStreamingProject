import React, {useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import PlayerControls from "./components/PlayerControls/PlayerControls";

const App = () => {

    const [currentState, setCurrentState] = useState({
        selectedSong: [],
    })

    const selectedSong = (video) => {
        setCurrentState({...currentState, selectedSong: video})
        console.log('current song' + video)
    }


    return (
        <div className="">
            <Header />
            <Search playSong={selectedSong}/>
            <PlayerControls song={currentState.selectedSong}/>
        </div>
    );
}

export default App;
