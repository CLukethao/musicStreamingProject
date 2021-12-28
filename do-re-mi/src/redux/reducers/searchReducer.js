import {FETCH_SEARCH, CLEAR_SEARCH} from "../constants/constantTypes";


export default (searchResults = [], action) => {
    switch (action.type) {

        case FETCH_SEARCH:
            return action.payload

        case CLEAR_SEARCH:
            return searchResults = []


        default:
            return searchResults;
    }
}
