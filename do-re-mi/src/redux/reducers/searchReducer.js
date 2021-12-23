import {FETCH_SEARCH} from "../constants/constantTypes";


export default (searchResults = [], action) => {
    switch (action.type) {

        case FETCH_SEARCH:
            return action.payload

        default:
            return searchResults;
    }
}
