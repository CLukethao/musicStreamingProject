import {CREATE_USER, DUPLICATE_EMAIL, LOGGED_IN, CLEAR_INPUT, LOGIN} from "../constants/constantTypes";


export default (user = {

    history: []

}, action) => {

    switch (action.type) {

        case LOGGED_IN:
            return action.payload

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
