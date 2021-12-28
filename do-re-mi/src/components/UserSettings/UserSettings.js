import React, {useEffect, useState} from 'react'
import './styles.css'
import {useSelector} from "react-redux";

const UserSettings = () => {

    const userInfo = useSelector((state) => state.user)

    const [readyToSubmit, setReadyToSubmit] = useState(false)

    const [updatedInfo, setUpdatedInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [disabled, setDisabled] = useState({
        name: true,
        email: true,
        password: true
    })

    const [signUpError, setSignUpError] = useState({
        name: null,
        email: null,
        password: null
    })

    const errMess = {
        name: 'Enter 1 or more characters',
        email: 'Invalid Email',
        password: 'Password must be 6-12 characters'
    }

    const updateInfo = (event) => {
        if (event.target.name === 'Name') {
            setUpdatedInfo(prevState => ({...prevState, name: event.target.value}))
        }

        else if (event.target.name === 'Email') {
            setUpdatedInfo(prevState => ({...prevState, email: event.target.value}))
        }

        else if (event.target.name === 'Password') {
            setUpdatedInfo(prevState => ({...prevState, password: event.target.value}))
        }
    }

    const editInfo = (label) => {
        if (label === 'Name') {
            setDisabled(prevState => ({...prevState, name: false}))
        }

        else if (label === 'Email') {
            setDisabled(prevState => ({...prevState, email: false}))
        }

        else if (label === 'Password') {
            setDisabled(prevState => ({...prevState, password: false}))
        }
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    useEffect(() => {
        if (disabled.name === false) {
            if (updatedInfo.name.length > 0) {
                setSignUpError((prevState => ({...prevState, name: false})))

            }

            else {
                setSignUpError((prevState => ({...prevState, name: true})))
            }
        }

        if (disabled.email === false) {
            if (emailRegex.test(updatedInfo.email)) {
                setSignUpError((prevState => ({...prevState, email: false})))

            }

            else {
                setSignUpError((prevState => ({...prevState, email: true})))
            }
        }

        if (disabled.password === false) {
            if (updatedInfo.password.length > 6 && updatedInfo.password.length <= 12) {
                setSignUpError((prevState => ({...prevState, password: false})))

            }

            else {
                setSignUpError((prevState => ({...prevState, password: true})))
            }
        }


    }, [disabled, updatedInfo])

    const onSubmit = () => {
        if (readyToSubmit) {
            console.log('success')
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center border-bottom'>
                <div className='col-12 text-start title playlist-header'>
                    Settings
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-6 text-white mt-4'>
                    {settings('Name', userInfo.name, updatedInfo.name, updateInfo, editInfo, signUpError.name, errMess.name,disabled.name)}
                    {settings('Email', userInfo.email, updatedInfo.email, updateInfo, editInfo, signUpError.email, errMess.email,disabled.email)}
                    {settings('Password', 'Password', updatedInfo.password, updateInfo, editInfo, signUpError.password, errMess.password,disabled.password)}
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='offset-2 col-3'>
                    <button className='btn btn-submit' onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

const settings = (label, placeholder, value, onChange, editBtn, error, errMess, editing) => {

    return (
        <div className='row mb-2 d-flex align-items-center justify-content-center'>
            <div className='col-2 text-start'>
                {label}
            </div>

            <div className='col-6 text-start'>
                <input className={error === true ? 'form-text error': "form-text text-black"}
                       type={placeholder === 'Password' ? 'password' : 'text'}
                       placeholder={placeholder}
                       value={value}
                       name={label}
                       onChange={(event) => onChange(event)}
                       disabled={editing}
                />

                <button className='btn text-white' onClick={event => editBtn(label)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
            </div>

            <div className={error === true ? 'col-6 offset-2 text-start text-danger' : 'hidden'}>
                {errMess}
            </div>
        </div>
    )
}

export default UserSettings