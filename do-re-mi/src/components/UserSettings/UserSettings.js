import React, {useEffect, useState} from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {clearUpdateMess, updateUserInfo} from "../../redux/actions/userActions";
import Success from "../Success/Success";
import ErrorMessage from "../Error/Error";

const UserSettings = () => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    const [updatedInfo, setUpdatedInfo] = useState({
        name: '',
        email: '',
        password: '',
        passMatch: ''
    })

    const [disabled, setDisabled] = useState({
        name: true,
        email: true,
        password: true
    })

    const [inputError, setInputError] = useState({
        name: null,
        email: null,
        password: null,
        passMatch: null
    })

    const errMess = {
        name: 'Enter 1 or more characters',
        email: 'Invalid Email',
        password: 'Password must be 6-12 characters',
        passMatch: 'Passwords do not match'
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

        else if (event.target.name === '') {
            setUpdatedInfo(prevState => ({...prevState, passMatch: event.target.value}))
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

    const cancelEdit = (label) => {
        if (label === 'Name') {
            setUpdatedInfo(prevState => ({...prevState, name: ''}))
            setDisabled(prevState => ({...prevState, name: true}))
            setInputError(prevState => ({...prevState, name: null}))
        }

        else if (label === 'Email') {
            setUpdatedInfo(prevState => ({...prevState, email: ''}))
            setDisabled(prevState => ({...prevState, email: true}))
            setInputError(prevState => ({...prevState, email: null}))
        }

        else if (label === 'Password') {
            setUpdatedInfo(prevState => ({...prevState, password: '', passMatch: ''}))
            setDisabled(prevState => ({...prevState, password: true}))
            setInputError(prevState => ({...prevState, password: null}))
        }
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    useEffect(() => {
        if (disabled.name === false) {
            if (updatedInfo.name.length > 0) {
                setInputError((prevState => ({...prevState, name: false})))

            }

            else {
                setInputError((prevState => ({...prevState, name: true})))
            }
        }

        if (disabled.email === false) {
            if (emailRegex.test(updatedInfo.email)) {
                setInputError((prevState => ({...prevState, email: false})))

            }

            else {
                setInputError((prevState => ({...prevState, email: true})))
            }
        }

        if (disabled.password === false) {
            if (updatedInfo.password.length > 6 && updatedInfo.password.length <= 12) {
                setInputError((prevState => ({...prevState, password: false})))

            }

            else {
                setInputError((prevState => ({...prevState, password: true})))
            }

            if (updatedInfo.passMatch === updatedInfo.password) {
                setInputError((prevState => ({...prevState, passMatch: false})))
            }

            else {
                setInputError((prevState => ({...prevState, passMatch: true})))
            }
        }

    }, [disabled, updatedInfo])

    const onSubmit = () => {

        let updatedUserInfo = {name: '', email: '', password: '', _id: user._id}

        if (inputError.name === false) {
            updatedUserInfo.name = updatedInfo.name
        }

        else {
            updatedUserInfo.name = user.name
        }

        if (inputError.email === false) {
            updatedUserInfo.email = updatedInfo.email
        }

        else {
            updatedUserInfo.email = user.email
        }

        if (inputError.password === false && inputError.passMatch === false) {
            updatedUserInfo.password = updatedInfo.password
        }

        if (inputError.name === true || inputError.email === true || inputError.password === true || inputError.passMatch === true) {

        }

        else if (inputError.name === false || inputError.email === false || inputError.password === false) {
            dispatch(updateUserInfo(updatedUserInfo))

        }
    }

    useEffect(() => () => {

        dispatch(clearUpdateMess())

        }

    , [])

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center border-bottom'>
                <div className='col-12 text-start title playlist-header'>
                    Settings
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-12 col-md-6 text-white mt-4'>
                    {settings('Name', user.name, updatedInfo.name, updateInfo, editInfo, inputError.name, errMess.name,disabled.name, cancelEdit)}
                    {settings('Email', user.email, updatedInfo.email, updateInfo, editInfo, inputError.email, errMess.email,disabled.email, cancelEdit)}
                    {settings('Password', 'Password', updatedInfo.password, updateInfo, editInfo, inputError.password, errMess.password, disabled.password, cancelEdit)}
                    {settings('', 'Confirm Password', updatedInfo.passMatch, updateInfo, editInfo, inputError.passMatch, errMess.passMatch, disabled.password, cancelEdit)}
                </div>
            </div>

            <div className='mt-1 row justify-content-center'>
                <div className='offset-1 col-3'>
                    <button className='btn btn-submit' onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>

            {user.updated === "success" ?
                <div className='mt-3 row text-center'>
                    <div className='offset-4 col-3'>
                    <Success>Updated</Success>
                    </div>
                </div>
                :
                user.updated === "error" ?
                    <div className='mt-3 row text-center'>
                        <div className='offset-4 col-3'>
                            <ErrorMessage>Email Already Taken</ErrorMessage>
                        </div>
                    </div>
                :
                null
            }

        </div>
    )
}

const settings = (label, placeholder, value, onChange, editBtn, error, errMess, editing, cancelEdit) => {

    return (
        <div className='row mb-2 d-flex align-items-center justify-content-center'>
            <div className='col-3 col-md-2 text-start'>
                {label}
            </div>

            <div className='col-8 col-md-6 text-start'>
                <input className={error === true ? 'form-text error': "form-text text-black"}
                       type={placeholder === 'Password' || placeholder === 'Confirm Password' ? 'password' : 'text'}
                       placeholder={placeholder}
                       value={value}
                       name={label}
                       onChange={(event) => onChange(event)}
                       disabled={editing}
                />

                {editing ? <button className={label === '' ? 'hidden' : 'btn text-white' } onClick={event => editBtn(label)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                 </svg>
                            </button>
                    :

                    <button className={label === '' ? 'hidden' : 'btn text-danger'} onClick={() => cancelEdit(label)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </button>
                }

            </div>

            <div className={error === true ? 'col-6 offset-2 text-start text-danger' : 'hidden'}>
                {errMess}
            </div>
        </div>
    )
}

export default UserSettings