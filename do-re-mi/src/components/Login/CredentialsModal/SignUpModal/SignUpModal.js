import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearError, createUser} from "../../../../redux/actions/userActions";
import ErrorMessage from "../../../Error/Error";
import Success from "../../../Success/Success";


const SignUpModal = ({closeModal}) => {

    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);
    const user = useSelector(state => state.user)

    const removeError = () => {
        dispatch(clearError())
    }


    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        dob: {
            month: '',
            day: '',
            year: ''
        },
        password: ''
    })

    const [signUpError, setSignUpError] = useState({
        name: null,
        email: null,
        password: null,
        dob: null
    })

    const errMess = {
        name: 'Enter 1 or more characters',
        email: 'Invalid Email',
        password:  'Password must be 6-12 characters',
        dob: 'Invalid Date'
    }

    const setDate = (date, id) => {
        if (id === 'month') {
            setUserInfo((prevState => ({...prevState, dob: {...prevState.dob, month: date}})))
        }

        else if (id === 'day') {
            setUserInfo((prevState => ({...prevState, dob: {...prevState.dob, day: date}})))
        }

        else if (id === 'year') {
            setUserInfo((prevState => ({...prevState, dob: {...prevState.dob, year: date}})))
        }
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const nameCheck = () => {
        if (userInfo.name.length === 0) {
            setSignUpError((prevState => ({...prevState, name: true})))

        }

        else {
            setSignUpError((prevState => ({...prevState, name: false})))
        }
    }

    const emailCheck = () => {
        if (!emailRegex.test(userInfo.email)) {
            setSignUpError((prevState => ({...prevState, email: true})))

        }

        else {
            setSignUpError((prevState => ({...prevState, email: false})))
        }
    }

    const passwordCheck = () => {
        if (userInfo.password.length < 6) {
            setSignUpError((prevState => ({...prevState, password: true})))

        }

        else {
            setSignUpError((prevState => ({...prevState, password: false})))
        }
    }

    const monthCheck = () => {
        if ((userInfo.dob.month.length === 0) || userInfo.dob.month === 'Month'  || (userInfo.dob.day <= 0) || userInfo.dob.year.length !== 4) {
            setSignUpError((prevState => ({...prevState, dob: true})))

        }

        else {
            setSignUpError((prevState => ({...prevState, dob: false})))
        }
    }

    const signUp = () => {
        if (signUpError.name === false && signUpError.email === false && signUpError.password === false && signUpError.dob === false) {

            dispatch(createUser({userInfo: userInfo}))
        }
    }


    return (
        <div className='row modal d-flex justify-content-center align-items-center vw-100'>
            <div className='col-10 text-center mb-2 text-white credentials-modal-container'>
                <div className='row justify-content-center'>

                    <div className='offset-2 col-6'>
                        <h1>Sign Up</h1>
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
                    <div className='col-12 col-md-3'>
                        <div className='row'>

                            <div className='col-12 pb-2'>
                                <input type='text'
                                       className={signUpError.name ? 'form-control error' : 'form-control'}
                                       id='name' placeholder='Name' value={userInfo.name} onBlur={() => nameCheck()}
                                       onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
                            </div>

                            <span className={signUpError.name ? 'col-12 pb-1 text-start text-danger' : 'hidden'}>{errMess.name}</span>

                            <div className='col-12 pb-2'>
                                <input type='text'
                                       className={signUpError.email === true ? 'form-control error' : 'form-control'}
                                       id='email' placeholder='Email' value={userInfo.email}
                                       onBlur={() => emailCheck()}
                                       onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
                            </div>

                            <span className={signUpError.email ? 'col-12 pb-1 text-start text-danger' : 'hidden'}>{errMess.email}</span>

                            <div className='col-12 pb-2'>
                                <input type='password'
                                       className={signUpError.password === true ? 'form-control error' : 'form-control'}
                                       id='password' placeholder='Password'
                                       value={userInfo.password}
                                       onBlur={() => passwordCheck()}
                                       onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                                />
                            </div>

                            <span className={signUpError.password ? 'col-12 pb-1 text-start text-danger' : 'hidden'}>{errMess.password}</span>


                            <div className='col-12'>
                                <DateSelection setDate={setDate} check={monthCheck} error={signUpError.dob}/>
                            </div>

                            <span className={signUpError.dob ? 'col-12 pb-1 text-start text-danger' : 'hidden'}>{errMess.dob}</span>

                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-6 col-md-2 mt-3'>
                            <div className='row'>
                                <button className='btn btn-login' onClick={() => signUp()}>Sign Up</button>
                            </div>
                        </div>
                    </div>


                    <div className='row justify-content-center'>
                        <div className='col-3 mt-3'>
                            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
                            {user.success ? <Success>Account Created!</Success> : null}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const DateSelection = ({setDate, check, error}) => {

    const Months = {
        January: 31,
        February: 29,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    }

    let months = []
    let days = []
    let years = []

    for (let i = 0; i < Object.keys(Months).length; i++) {
        months.push(<option value={Object.keys(Months)[i]} key={Object.keys(Months)[i]}>{Object.keys(Months)[i]}</option>)
    }

    for (let i = 1; i < 32; i++) {
        days.push(<option value={i} key={`day${i}`}>{i}</option>)
    }

    let currentYear = new Date().getFullYear()

    for (let i = currentYear; i > 1900; i--) {
        years.push(<option value={i} key={`year${i}`}>{i}</option>)
    }

    return (

        <div className='row'>
            <div className='col-5'>
                <select className={error === true ? 'form-select error' : 'form-select'}  id="month" onChange={event => setDate(event.target.value, event.target.id)}>
                    <option defaultValue='Month'>Month</option>
                    {months}
                </select>
            </div>

            <div className='col-3 p-0'>
                <select className={error === true ? 'form-select error' : 'form-select'} id="day" onChange={event => setDate(event.target.value, event.target.id)}>
                    <option defaultValue='Day'>Day</option>
                    {days}
                </select>
            </div>

            <div className='col-4'>
                <select className={error === true ? 'form-select error' : 'form-select'} id="year" onChange={event => setDate(event.target.value, event.target.id)} onBlur={() => check()}>
                    <option defaultValue='Years'>Years</option>
                    {years}
                </select>
            </div>
        </div>
    )
}

export default SignUpModal