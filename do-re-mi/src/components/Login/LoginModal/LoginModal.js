import React, {useImperativeHandle, useState, forwardRef, useCallback, useEffect} from "react";
import {createPortal} from "react-dom";
import '../styles.css';

const modalElement = document.getElementById('modal-root')

export const LoginModal = ({ defaultOpened }, ref) => {

    const [isOpen, setIsOpen] = useState(defaultOpened)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }))

    const handleEscape = useCallback(event => {
        if (event.keyCode === 27) setIsOpen(false)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape, false)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, false)
        }
    }, [handleEscape, isOpen])

    return createPortal(
        isOpen ?
            <div className='container'>
                <div className='row modal d-flex justify-content-center align-items-center'>
                    <div className='col-12 text-center mb-2'>
                        <div className='row justify-content-center'>
                            <div className='col-3'>
                                <input type='text' className='form-control' id='email' placeholder='email'/>
                            </div>

                            <div className='col-3'>
                                <input type='text' className='form-control' id='password' placeholder='password'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            : null, modalElement
    )
}

export default forwardRef(LoginModal)
