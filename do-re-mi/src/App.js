import React from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import Home from "./components/Home/Home"
import {Routes, Route} from "react-router-dom";


const App = () => {


    return (
        <div className="">
            <Header />

            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/search' element={<Search />} />
            </Routes>

            <Player />
        </div>
    );
}

export default App;
