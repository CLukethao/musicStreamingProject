import React, {useRef} from 'react'
import '../styles.css'
import {NavLink} from "react-router-dom";
import CredentialsModal from "../../Login/CredentialsModal/CredentialsModal";





const Menu = ({navIsOpen, closeNav, logOut, loggedIn}) => {

    const modal = useRef(null)

    const openModal = () => {

        modal.current.open()
    }

    return (
        <div className={(navIsOpen ? "col-2 text-start nav-list vh-100 menu show" : "col-2 text-start nav-list vh-100 menu hide")} >
                <div className="container mt-3">
                    <div className='row'>
                        <span className='menu-underline'>
                            <NavLink to="/search" className='navbar-link' onClick={() => closeNav()}>
                                Search
                            </NavLink>
                        </span>

                        <span className='menu-underline'>
                            <NavLink to="/playlists" className='navbar-link' onClick={() => closeNav()}>
                                Playlists
                            </NavLink>
                        </span>

                        <span className='menu-underline'>
                            <NavLink to="/history" className='navbar-link' onClick={() => closeNav()}>
                                History
                            </NavLink>
                        </span>

                        {loggedIn ?

                            <button className="login-btn navbar-link mt-2" onClick={() => {logOut(); closeNav()}}>
                                Sign Out
                            </button>
                            :
                            <button className="login-btn navbar-link mt-2" onClick={() => {openModal(); closeNav()}}>
                                Sign in
                            </button>
                        }

                    </div>
                </div>

            <CredentialsModal ref={modal} modalType={'login'}/>
        </div>
    )
}

export default Menu;