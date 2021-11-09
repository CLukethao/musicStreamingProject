
import React, {useState} from "react";
import Menu from "./Menu/Menu";
import './styles.css'

const Header = () => {

    const [navState, setNavState] = useState({
        navIsOpen: false
    })

    const toggleNav = () => {
        setNavState({
            navIsOpen: !navState.navIsOpen
        })
    }

    return (
        <div className='row header-font header'>
            <div className='col-12 logo bg-color'>
                <button className='menu-btn btn' onClick={toggleNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                Do Re Mi
            </div>

            <Menu navIsOpen={navState.navIsOpen}/>
        </div>

    )
}

export default Header