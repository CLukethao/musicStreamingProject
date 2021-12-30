import React from 'react'
import {Alert} from "reactstrap";

const ErrorMessage = ({ children }) => {
    return (
        <Alert color="danger" style={{fontSize: 20}}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage