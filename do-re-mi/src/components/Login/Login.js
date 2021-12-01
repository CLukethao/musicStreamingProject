import React, {useRef, useState} from 'react'
import CredentialsModal from "./CredentialsModal/CredentialsModal";
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

    return (
        <div className='row align-content-center justify-content-center vh-100'>
            <div className='col-12 text-center menu-header'>
                <h1 className='mb-3'>Do-Re-Mi</h1>
                <h2>The only music stream you'll need.</h2>
            </div>

            <div className='col-3 text-center btn-login-container'>
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
