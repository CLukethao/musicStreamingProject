import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearError, login} from "../../../../redux/actions/userActions";
import ErrorMessage from "../../../Error/Error";



const LogInModal = ({ closeModal }) => {

    const dispatch = useDispatch()
    const error = useSelector((state) => state.user.error);

    const removeError = () => {
        dispatch(clearError())
    }

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const onEmailChange = (event) => {
        setLoginInfo((prevState => ({...prevState, email: event.target.value})))
    }

    const onPasswordChange = (event) => {
        setLoginInfo((prevState => ({...prevState, password: event.target.value})))
    }

    const onLogin = () => {

        dispatch(login(loginInfo))
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {

            dispatch(login(loginInfo))
        }
    }

    useEffect(() => {

        if (loginInfo.email) {
            document.addEventListener('keydown', handleEnter, false);
        }



        return () => {
            document.removeEventListener('keydown', handleEnter, false);
        }
    }, [loginInfo])

    return (
        <div className='row modal d-flex justify-content-center align-items-center vw-100'>
            <div className='col-10 text-center mb-2 text-white credentials-modal-container'>
                <div className='row justify-content-center'>
                    <div className='offset-2 col-3'>
                        <h1>Sign In</h1>
                    </div>

                    <div className='col-2 text-start'>
                        <button className='btn text-white' onClick={() => {closeModal(); removeError()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fillRule="evenodd"
                                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='row justify-content-center mb-2'>
                        <div className='col-12 mb-2 mb-md-0 col-md-3'>
                            <input type='text' className='form-control' id='email' placeholder='Email' value={loginInfo.email} onChange={(event => onEmailChange(event))}/>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-3'>
                            <input type='password' className='form-control' id='password' placeholder='Password' value={loginInfo.password} onChange={(event => onPasswordChange(event))}/>
                        </div>
                    </div>


                    <div className='row justify-content-center'>
                        <div className='col-6 col-md-2 mt-3'>
                            <div className='row'>
                                <button className='btn text-black btn-login' onClick={() => onLogin()}>Log in</button>
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-3 mt-3'>
                            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInModal