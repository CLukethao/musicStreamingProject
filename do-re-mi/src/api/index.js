import axios from 'axios';

// const url = 'http://127.0.0.1:5000/search';

const playlistUrl = 'http://localhost:5000/playlists';
const historyUrl = 'http://localhost:5000/history'


export const fetchPlaylists = () => axios.get(playlistUrl);

export const createPlaylist = (newPlaylist) => axios.post(playlistUrl, newPlaylist);

export const updatePlaylist = (id, updatedPlaylist) => axios.patch(`${playlistUrl}/${id}`, updatedPlaylist)

export const deletePlaylist = (id) => axios.delete(`${playlistUrl}/${id}`)

export const fetchHistory = () => axios.get(historyUrl);

export const createHistory = (newHistory) => axios.post(historyUrl, newHistory)

export const updateHistory = (id, updatedHistory) => axios.patch(`${historyUrl}/${id}`, updatedHistory)

const searchUrl = 'https://www.googleapis.com/youtube/v3/search?key='
const API_KEY = 'AIzaSyDlnn9kjXhP8g6mrWbHZev0fivwxJQlOSA'
const searchParams = '&type=video&part=snippet&maxResults=14&q='

export const fetchSearch = (searchQuery) => axios.get(searchUrl + API_KEY + searchParams + searchQuery);


