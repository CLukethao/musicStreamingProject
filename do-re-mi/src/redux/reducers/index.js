import {combineReducers} from "redux";
import reducer from "./reducer";
import playlists from "./playlistReducer";


export default combineReducers({reducer, playlists})