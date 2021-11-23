import React, {useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";

const App = () => {

    const [songHistory, setSongHistory] = useState([])
    const [songSelected, setSongSelected] = useState({})

    const updateHistory = (song) => {

        setSongSelected(song)

        if (songHistory === undefined || songHistory.length === 0) {
            setSongHistory([...songHistory, song]);

        }

        else if (songHistory.map(songInHistory => songInHistory.id.videoId).indexOf(song.id.videoId) !== -1) {

        }

        else {
            setSongHistory([...songHistory, song]);
        }
    }

    const playerSetSong = (song) => {
        setSongSelected(song)
    }

    return (
        <div className="">
            <Header />
            <Search selectedSong={updateHistory}/>
            <Player songSelected={songSelected} setSong={playerSetSong} songHistory={songHistory}/>

        </div>
    );
}

export default App;
