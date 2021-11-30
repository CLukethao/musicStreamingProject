import React, {useRef} from 'react'
import LoginModal from './LoginModal/LoginModal.js'
import './styles.css'

const Login = () => {

    const modal = useRef(null)

    return (
        <div className='row align-content-center vh-100'>
            <div className='col-12 text-center menu-header'>
                <h1 className='mb-3'>Do-Re-Mi</h1>
                <h2>The only music streaming site you need.</h2>
            </div>

            <div className='col-12 text-center btn-login-container'>
                <button className='btn btn-login' onClick={() => modal.current.open()}>Login</button>
            </div>

            <LoginModal ref={modal} />
        </div>
    )
}

export default Login
