import {CREATE_USER, DUPLICATE_EMAIL, UPDATE_USER_INFO, CLEAR_INPUT, LOGIN} from "../constants/constantTypes";


export default (user = {
    name: '',
    email: '',
    dob: {
        month: '',
        day: '',
        year: ''
    },
    password: ''

}, action) => {

    switch (action.type) {

        case UPDATE_USER_INFO:
            return {...user, user: action.payload}

        case CREATE_USER:
            return action.payload

        case DUPLICATE_EMAIL:
            return action.payload

        case CLEAR_INPUT:
            return action.payload

        case LOGIN:
            return action.payload

        default:
            return user;
    }
}
