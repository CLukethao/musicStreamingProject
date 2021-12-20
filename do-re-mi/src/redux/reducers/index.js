import {combineReducers} from "redux";
import playlists from "./playlistReducer";
import searchResults from './searchReducer'
import history from './historyReducer'
import user from './userReducer'


export default combineReducers({playlists, searchResults, history, user})