import React, {useRef} from 'react'
import '../styles.css'
import {NavLink} from "react-router-dom";
import CredentialsModal from "../../Login/CredentialsModal/CredentialsModal";


const Menu = ({navIsOpen, closeMenu}) => {

    const modal = useRef(null)

    const openModal = () => {

        modal.current.open()
    }

    return (
        <div className={(navIsOpen ? "col-2 text-start nav-list vh-100 menu show" : "col-2 text-start nav-list vh-100 menu hide")} >
                <div className="container">
                    <div className='row'>

                        <span className='menu-underline'>
                            <NavLink to="/search" className='navbar-link' onClick={closeMenu}>
                                Search
                            </NavLink>
                        </span>

                        <span className='menu-underline'>
                            <NavLink to="/playlists" className='navbar-link' onClick={closeMenu}>
                                Playlists
                            </NavLink>
                        </span>

                        <span className='menu-underline'>
                            <NavLink to="/history" className='navbar-link' onClick={closeMenu}>
                                History
                            </NavLink>
                        </span>

                        <button className="login-btn navbar-link mt-2" onClick={() => {openModal(); closeMenu()}}>
                            Sign in
                        </button>

                    </div>
                </div>

            <CredentialsModal ref={modal} modalType={'login'}/>
        </div>
    )
}

export default Menu;