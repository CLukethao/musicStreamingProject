import React from "react";


const LogInModal = ({closeModal}) => {

    return (
        <div className='row modal d-flex justify-content-center align-items-center'>
            <div className='col-10 text-center mb-2 text-white'>
                <div className='row justify-content-center'>
                    <div className='offset-2 col-6'>
                        <h1>Sign In</h1>
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
                    <div className='col-3'>
                        <input type='text' className='form-control' id='email' placeholder='Email'/>
                    </div>

                    <div className='col-3'>
                        <input type='text' className='form-control' id='password' placeholder='Password'/>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-6 mt-3'>
                            <div className='row'>
                                <button className='btn bg-primary text-white btn-login'>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInModal