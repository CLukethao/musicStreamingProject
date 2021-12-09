import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import Login from "./components/Login/Login";
import History from "./components/History/History";
import Playlists from "./components/Playlists/Playlists";


const App = () => {


    return (
        <div className="">
            <Header />

            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/search' element={<Search />} />
                <Route path='/history' element={<History />} />
                <Route path='/playlists' element={<Playlists />} />
            </Routes>

            <Player />
        </div>
    );
}

export default App;
