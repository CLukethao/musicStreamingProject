import React, {useState} from "react";

const SignUpModal = ({closeModal}) => {

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        dob: {
            month: '',
            day: '',
            year: ''
        },
    })

    const [signUpError, setSignUpError] = useState({
        name: null,
        email: null,
        dob: null
    })

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

    const onNext = () => {


        if (userInfo.name.length > 0 && emailRegex.test(userInfo.email) && userInfo.dob.month.length > 0 && userInfo.dob.month !== 'Month'  && userInfo.dob.day > 0 && userInfo.dob.year.length === 4) {
            console.log('everything is correct')
        }

        else if (userInfo.name.length === 0) {
            setSignUpError((prevState => ({...prevState, name: true})))
            console.log('name error')
        }

        else if (!emailRegex.test(userInfo.email)) {
            setSignUpError((prevState => ({...prevState, email: true})))
            console.log('email error')
        }

        else if (!(userInfo.dob.month.length > 0) || userInfo.dob.month !== 'Month'  || !(userInfo.dob.day > 0) || userInfo.dob.year.length !== 4) {
            setSignUpError((prevState => ({...prevState, dob: true})))
            console.log('dob error')
        }
        else {
            console.log('no clue')
        }
        console.log(userInfo)
        console.log(signUpError)
    }

    return (
        <div className='row modal d-flex justify-content-center align-items-center'>
            <div className='col-10 text-center mb-2 text-white'>
                <div className='row justify-content-center'>
                    <div className='offset-2 col-6'>
                        <h1>Sign Up</h1>
                    </div>

                    <div className='col-2 text-start'>
                        <button className='btn text-white' onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fill-rule="evenodd"
                                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-5'>
                        <div className='row'>
                            <div className='col-12 pb-3'>
                                <input type='text' className='form-control' id='name' placeholder='Name' value={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
                            </div>

                            <div className='col-12 pb-3'>
                                <input type='text' className='form-control' id='email' placeholder='Email' value={userInfo.email} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
                            </div>

                            <div className='col-12'>
                                <DateSelection setDate={setDate}/>
                            </div>

                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-3 mt-3'>
                            <div className='row'>
                                <button className='btn bg-primary text-white btn-login' onClick={onNext}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DateSelection = ({setDate}) => {

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
                <select className="form-select" id="month" onChange={event => setDate(event.target.value, event.target.id)}>
                    <option defaultValue='Month'>Month</option>
                    {months}
                </select>
            </div>

            <div className='col-3'>
                <select className="form-select" id="day" onChange={event => setDate(event.target.value, event.target.id)}>
                    <option defaultValue='Day'>Day</option>
                    {days}
                </select>
            </div>

            <div className='col-4'>
                <select className="form-select" id="year" onChange={event => setDate(event.target.value, event.target.id)}>
                    <option defaultValue='Years'>Years</option>
                    {years}
                </select>
            </div>
        </div>
    )
}


export default SignUpModal