import React from 'react'
import {Alert} from "reactstrap";

const SuccessMessage = ({ children }) => {
    return (
        <Alert color="success" style={{fontSize: 20}}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default SuccessMessage