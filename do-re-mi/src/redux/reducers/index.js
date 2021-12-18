import {combineReducers} from "redux";
import reducer from "./reducer";
import playlists from "./playlistReducer";
import searchResults from './searchReducer'
import history from './historyReducer'


export default combineReducers({reducer, playlists, searchResults, history})