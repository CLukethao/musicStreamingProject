
import * as api from '../../api';
import * as constantType from '../constants/constantTypes'

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
        console.log(data)
        dispatch({type: constantType.CREATE_USER, payload: data})

    }

    catch (error) {
        console.log(error)
    }
}

export const updateUserInfo = (userInfo) => async (dispatch) => {
    try {

        const { data } = await api.updateUserInfo(userInfo)

        const updatedInfo = {
            _id: data._id,
            name: data.name,
            email: data.email,
            token: data.token
        }

        if (data.updated !== "error") {
            localStorage.setItem('userInfo', JSON.stringify(updatedInfo))

            dispatch({type: constantType.UPDATE_USER_SETTINGS, payload: data})
        }

        else {
            dispatch({type: constantType.UPDATE_USER_ERROR, payload: data})
        }
    }

    catch (error) {
        console.log(error)
    }
}

export const login = (userInfo) => async (dispatch) => {

    try {

        const { data } = await api.login(userInfo)

        if (!data.error) {
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
        
        dispatch({type: constantType.LOGIN, payload: data})


    }

    catch (error) {
        console.log(error)
    }
}

export const clearUpdateMess = () => async (dispatch) => {
    try {
        dispatch({type: constantType.CLEAR_UPDATE_MESS})
    }

    catch (error) {
        console.log(error)
    }

}

export const clearError = () => async (dispatch) => {

    try {
        dispatch({type: constantType.CLEAR_INPUT, payload: {}})
    }

    catch (error) {
        console.log(error)
    }
}

export const logOut = () => async (dispatch) => {
    try {
        localStorage.removeItem("userInfo")
        dispatch({type: constantType.LOG_OUT})
    }

    catch (error) {
        console.log(error)
    }
}
