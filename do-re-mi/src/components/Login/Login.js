import React, {useEffect, useRef, useState} from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CredentialsModal from "./CredentialsModal/CredentialsModal";
import videoBg from '../../images/videoBg.mp4'
import './styles.css'

const Login = () => {


    const modal = useRef(null)

    const [modalType, setModalType] = useState(null)

    const openModal = (event) => {

        if (event.target.id === 'login') {
            setModalType('login')
        }

        else {
            setModalType('signUp')
        }

        modal.current.open()
    }

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {

        if (user._id) {
            navigate('/search')
        }

    }, [user._id])

    return (
        <div className='row align-content-center justify-content-center vh-100 login-container'>

            <video autoPlay loop muted className='bg-video'>
                <source src={videoBg}/>
                <a href="https://www.vecteezy.com/video/2421868-sci-fi-neon-circle-tunnel-abstract-background-with-neon-stars-animation">Sci-Fi Neon Circle Tunnel Abstract Background with Neon Stars Animation Stock Videos by Vecteezy</a>
            </video>


            <div className='col-12 text-center menu-header'>
                <h1 className='mb-3'>Do-Re-Mi</h1>
                <h2>The only music stream you'll need.</h2>
            </div>

            <div className='col-6 col-md-2 text-center btn-login-container'>
                <div className='row'>
                    <button className='btn btn-login' id='login' onClick={(event) => openModal(event)}>Sign In</button>
                </div>

                <div className='row mt-3 signUp-tip'>
                    <p>
                        Don't have an account? <a className='signUp-anchor' id='signUp' onClick={(event) => openModal(event)}>Sign up</a>
                    </p>
                </div>
            </div>

            <CredentialsModal ref={modal} modalType={modalType}/>
        </div>
    )
}

export default Login
