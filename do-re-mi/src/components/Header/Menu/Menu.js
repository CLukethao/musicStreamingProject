import React, {useRef} from 'react'
import '../styles.css'
import {NavLink} from "react-router-dom";
import CredentialsModal from "../../Login/CredentialsModal/CredentialsModal";


const Menu = ({navIsOpen, toggleNav, toggleFalse}) => {

    const modal = useRef(null)

    const openModal = () => {

        modal.current.open()
    }

    return (
        <div id='menu' className={(navIsOpen ? "col-2 text-start nav-list vh-100 show" : "col-2 text-start nav-list vh-100 hide")} onMouseLeave={toggleFalse}>
                <div className="container">
                    <div className='row'>

                        <NavLink to="/search" className='navbar-link' onClick={toggleNav}>
                            Search
                        </NavLink>

                        <NavLink to="/search" className='navbar-link' onClick={toggleNav}>
                                Playlists
                        </NavLink>

                        <NavLink to="/history" className='navbar-link' onClick={toggleNav}>
                            History
                        </NavLink>

                        <button className="login-btn navbar-link" onClick={openModal}>
                            Sign in
                        </button>

                    </div>
                </div>

            <CredentialsModal ref={modal} modalType={'login'}/>
        </div>
    )
}

export default Menu;