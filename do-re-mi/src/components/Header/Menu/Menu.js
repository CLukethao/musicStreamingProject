import React from 'react'
import {Navbar, Nav, NavItem} from 'reactstrap';
import '../styles.css'

const Menu = ({navIsOpen}) => {


        return (
            <div id='menu' className={(navIsOpen ? "col-2 text-start nav-list vh-100" : "col-2 text-start nav-list vh-100 hide")}>
                <Navbar>
                    <div className="container">
                        <div className='row'>
                            <Nav navbar>
                                <NavItem>
                                    <a className="nav-link navbar-link" href=''>
                                        Home
                                    </a>
                                </NavItem>

                                <NavItem>
                                    <a className="nav-link navbar-link" href=''>
                                        Search
                                    </a>
                                </NavItem>

                                <NavItem>
                                    <a className="nav-link navbar-link" href=''>
                                        Playlists
                                    </a>
                                </NavItem>
                            </Nav>

                            <Nav navbar>
                                <NavItem>
                                    <button className="login-btn nav-link navbar-link" to='#signin'>
                                        Sign in
                                    </button>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                </Navbar>
            </div>
        )
}

export default Menu;