import {UPDATE_USER_INFO} from "../constants/constantTypes";


export default (user = {
    user: {
        name: 'User Name',
        email: '123@123.com',
        password: 'password'
    },
}, action) => {

    switch (action.type) {

        case UPDATE_USER_INFO:
            return {...user, user: action.payload}

        default:
            return user;
    }
}
