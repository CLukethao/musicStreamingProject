import React, {useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";

const App = () => {

    const [songHistory, setSongHistory] = useState([])
    const [songSelected, setSongSelected] = useState({})

    const updateHistory = (video) => {

        setSongSelected(video)

        if (songHistory === undefined || songHistory.length === 0) {
            setSongHistory([...songHistory, video]);

        }

        else if (songHistory.map(videoInHistory => videoInHistory.id.videoId).indexOf(video.id.videoId) !== -1) {

        }

        else {
            setSongHistory([...songHistory, video]);
        }
    }


    console.log(songHistory)
    console.log(window)

    return (
        <div className="">
            <Header />
            <Search selectedSong={updateHistory}/>
            <Player songSelected={songSelected} songHistory={songHistory} updateHistory={updateHistory}/>

        </div>
    );
}

export default App;
