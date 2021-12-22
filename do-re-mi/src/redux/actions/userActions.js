
import * as api from '../../api';
import * as constantType from '../constants/constantTypes'
import data from "bootstrap/js/src/dom/data";

export const loggedIn = (userInfo) => (dispatch) => {
    try {
        dispatch({type: constantType.LOGGED_IN, payload: userInfo})
    }

    catch (error) {
        console.log(error)
    }
}


export const createUser = (userInfo) => async (dispatch) => {

    try {

        const { data } = await api.createUser(userInfo)

        dispatch({type: constantType.CREATE_USER, payload: data})

    }

    catch (error) {
        console.log(error)
    }
}

export const login = (userInfo) => async (dispatch) => {

    try {

        const { data } = await api.login(userInfo)
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({type: constantType.LOGIN, payload: data})


    }

    catch (error) {
        console.log(error)
    }
}

export const clearError = () => async (dispatch) => {
    let user = {
        name: '',
        email: '',
        dob: {
            month: '',
            day: '',
            year: ''
        },
        password: ''
    }

    try {
        dispatch({type: constantType.CLEAR_INPUT, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}

