import React, {useEffect} from 'react'
import './App.css'
import {Routes, Route, useNavigate} from "react-router-dom";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import Login from "./components/Login/Login";
import History from "./components/History/History";
import Playlists from "./components/Playlists/Playlists";
import UserSettings from "./components/UserSettings/UserSettings";
import {useDispatch, useSelector} from "react-redux";
import {loggedIn} from "./redux/actions/userActions";
import UserAuth from "./components/UserAuth/UserAuth";
import {getPlaylists} from "./redux/actions/playlistActions";
import {getHistory} from "./redux/actions/historyActions";



const App = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentDate = useSelector(state => state.history.currentDate)
    const user = useSelector(state => state.user)

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (userInfo) {
            if (!user._id) {
                dispatch(loggedIn(userInfo))
            }
            dispatch(getPlaylists(userInfo._id))
            dispatch(getHistory(currentDate, userInfo._id))
            navigate('/search')
        }

    }, [user._id, currentDate, dispatch])

    return (
        <div>
            <Header />

            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/search' element={<UserAuth> <Search/> </UserAuth>} />
                <Route path='/history' element={<UserAuth> <History /> </UserAuth>} />
                <Route path='/playlists' element={<UserAuth> <Playlists /> </UserAuth>} />
                <Route path='/settings' element={<UserAuth> <UserSettings /> </UserAuth>} />
            </Routes>

            <Player />
        </div>
    );
}

export default App;
