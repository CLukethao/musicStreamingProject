import React, {useEffect} from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import Login from "./components/Login/Login";
import History from "./components/History/History";
import Playlists from "./components/Playlists/Playlists";
import UserSettings from "./components/UserSettings/UserSettings";
import {getPlaylists} from "./redux/actions/playlistActions";
import {useDispatch, useSelector} from "react-redux";
import {createHistory, getHistory} from "./redux/actions/historyActions";


const App = () => {

    const dispatch = useDispatch()

    const history = useSelector((state) => state.history.history)
    const currentDate = useSelector((state) => state.history.currentDate)

    useEffect(() => {
        dispatch(getPlaylists())
        dispatch(getHistory(currentDate))

    }, [dispatch])

    // useEffect(() => {
    //     console.log(currentDate)
    //     console.log(history)
    //
    //     if (history.length === 0 || history[0].date !== currentDate) {
    //         dispatch(createHistory(currentDate))
    //     }
    //
    // }, history)

    return (
        <div className="">
            <Header />

            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/search' element={<Search />} />
                <Route path='/history' element={<History />} />
                <Route path='/playlists' element={<Playlists />} />
                <Route path='/settings' element={<UserSettings />} />
            </Routes>

            <Player />
        </div>
    );
}

export default App;
