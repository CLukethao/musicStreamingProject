import * as constantType from "../constants/constantTypes";
import * as api from "../../api";


export const getSearch = (searchQuery) => async (dispatch) => {
    try {

        const { data } = await api.fetchSearch(searchQuery);

        dispatch({type: constantType.FETCH_SEARCH, payload: data.items})
    }

    catch (error) {
        console.log(error)
    }

}