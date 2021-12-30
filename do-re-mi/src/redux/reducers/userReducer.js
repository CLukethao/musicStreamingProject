import {
    CREATE_USER,
    LOGGED_IN,
    UPDATE_USER_SETTINGS,
    CLEAR_INPUT,
    LOGIN,
    LOG_OUT,
    UPDATE_USER_ERROR, CLEAR_UPDATE_MESS
} from "../constants/constantTypes";


export default (user = {


}, action) => {

    switch (action.type) {

        case LOGGED_IN:
            return action.payload

        case CREATE_USER:
            return action.payload

        case UPDATE_USER_SETTINGS:
            return action.payload

        case UPDATE_USER_ERROR:
            return {...user, updated: action.payload.updated}

        case CLEAR_UPDATE_MESS:
            const {updated, ...withoutUpdated} = user
            return withoutUpdated

        case CLEAR_INPUT:
            return action.payload

        case LOGIN:
            return action.payload

        case LOG_OUT:
            return {}

        default:
            return user;
    }
}
