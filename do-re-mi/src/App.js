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
import {getHistory} from "./redux/actions/historyActions";
import {loggedIn} from "./redux/actions/userActions";


const App = () => {

    const dispatch = useDispatch()
    const currentDate = useSelector((state) => state.history.currentDate)

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (userInfo) {
            dispatch(loggedIn(userInfo))
        }

    }, [dispatch])

    useEffect(() => {

        dispatch(getPlaylists())
        dispatch(getHistory(currentDate, '61c2310641b678f005c3bdab'))

    }, [dispatch])


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
