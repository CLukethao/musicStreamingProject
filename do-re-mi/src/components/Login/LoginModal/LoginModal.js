// import React, {useImperativeHandle, useState, forwardRef, useCallback, useEffect} from "react";
// import {createPortal} from "react-dom";
// import '../styles.css';
//
// const modalElement = document.getElementById('modal-root')
//
// const LoginModal = ({ defaultOpened, modalType}, ref) => {
//
//     const [isOpen, setIsOpen] = useState(defaultOpened)
//
//     useImperativeHandle(ref, () => ({
//         open: () => setIsOpen(true),
//         close: () => setIsOpen(false)
//     }))
//
//     const handleEscape = useCallback(event => {
//         if (event.keyCode === 27) setIsOpen(false)
//     }, [])
//
//     useEffect(() => {
//         if (isOpen) {
//             document.addEventListener('keydown', handleEscape, false)
//         }
//
//         return () => {
//             document.removeEventListener('keydown', handleEscape, false)
//         }
//     }, [handleEscape, isOpen])
//
//     const closeModal = () => {
//         console.log(modalType)
//         setIsOpen(false)
//     }
//
//     return createPortal(
//         isOpen ?
//             <div className='container'>
//                 <div className='row modal d-flex justify-content-center align-items-center'>
//                     <div className='col-10 text-center mb-2 text-white'>
//                         <div className='row justify-content-center'>
//                             <div className='offset-2 col-6'>
//                                 <h1>Sign in</h1>
//                             </div>
//
//                             <div className='col-2 text-start'>
//                                 <button className='btn text-white' onClick={closeModal}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//                                          className="bi bi-x-lg" viewBox="0 0 16 16">
//                                         <path fill-rule="evenodd"
//                                               d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
//                                         <path fill-rule="evenodd"
//                                               d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//
//                         <div className='row justify-content-center'>
//                             <div className='col-3'>
//                                 <input type='text' className='form-control' id='email' placeholder='email'/>
//                             </div>
//
//                             <div className='col-3'>
//                                 <input type='text' className='form-control' id='password' placeholder='password'/>
//                             </div>
//
//                             <div className='row justify-content-center'>
//                                 <div className='col-6 mt-3'>
//                                     <div className='row'>
//                                         <button className='btn bg-primary text-white btn-login'>Log in</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
//             : null, modalElement
//     )
// }
//
// export default forwardRef(LoginModal)
