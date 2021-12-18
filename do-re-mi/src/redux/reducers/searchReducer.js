import {FETCH_SEARCH} from "../constants/constantTypes";


export default (searchResults = [], action) => {
    switch (action.type) {

        case FETCH_SEARCH:
            console.log(action.payload)
            return action.payload

        default:
            return searchResults;
    }
}