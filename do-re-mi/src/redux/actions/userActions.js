
import * as constantType from '../constants/constantTypes'

export const updateUserInfo = (data) => (dispatch) => {
    try {
        dispatch({type: constantType.UPDATE_USER_INFO, payload: data})
    }

    catch (error) {
        console.log(error)
    }
}


