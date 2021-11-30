import React from 'react'
import '../styles.css'
import {NavLink} from "react-router-dom";

const Menu = ({navIsOpen, toggleNav, toggleFalse}) => {

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

                        <NavLink to="/search" className='navbar-link' onClick={toggleNav}>
                            History
                        </NavLink>

                        <NavLink to="/search">
                            <button className="login-btn navbar-link" to='#signin'>
                                Sign in
                            </button>
                        </NavLink>
                    </div>
                </div>
        </div>
    )
}

export default Menu;