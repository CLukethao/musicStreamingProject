import React, {useEffect, useState} from "react";
import Menu from "./Menu/Menu";
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/actions/userActions";
import {clearHistory} from "../../redux/actions/historyActions";
import {clearPlaylist} from "../../redux/actions/playlistActions";
import {clearSearch} from "../../redux/actions/searchActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import './styles.css'




const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user._id) {
            setLoggedIn(true)
        }

        else {setLoggedIn(false)}

    }, [user])

    const [navState, setNavState] = useState({
        navIsOpen: false
    })

    const toggleNav = () => {
        setNavState({
            navIsOpen: !navState.navIsOpen
        })

    }

    const closeNav = () => {
        setNavState({
            navIsOpen: false
        })
    }

    const logOutUser = () => {
        dispatch(logOut())
        dispatch(clearHistory())
        dispatch(clearPlaylist())
        dispatch(clearSearch())

        navigate('/')
    }

    return (
        <div className='row header align-items-center bg-color d-flex' onMouseLeave={() => closeNav()}>
            <div className='col-10 header-font'>
                <button className='menu-btn btn title' onClick={event => {toggleNav(); event.currentTarget.blur()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>

                Do-Re-Mi
            </div>

            <div className='col-2 text-end'>
                <span>
                    <NavLink to="/settings" className='profile-btn' onClick={() => closeNav()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>

                        &nbsp;

                        {user.name}

                    </NavLink>
                </span>
            </div>

            <Menu navIsOpen={navState.navIsOpen} toggleNav={toggleNav} closeNav={closeNav} logOut={logOutUser} loggedIn={loggedIn}/>
        </div>

    )
}

export default Header