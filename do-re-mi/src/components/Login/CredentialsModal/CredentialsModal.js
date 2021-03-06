import React, {useImperativeHandle, useState, forwardRef, useCallback, useEffect} from "react";
import {createPortal} from "react-dom";
import '../styles.css';
import LogInModal from "./LogInModal/LogInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

const modalElement = document.getElementById('login-modal-root')

const CredentialsModal = ({ defaultOpened, modalType}, ref) => {

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

    const closeModal = () => {
        setIsOpen(false)
    }

    if (modalType === 'login') {
        return createPortal(
            isOpen ?

                    <LogInModal closeModal={closeModal}/>


                : null, modalElement
        )
    }

    else {
        return createPortal(
            isOpen ?

                    <SignUpModal closeModal={closeModal}/>


                : null, modalElement
        )
    }
}

export default forwardRef(CredentialsModal)
