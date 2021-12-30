import axios from 'axios';

const playlistUrl = 'http://localhost:5000/playlists';
const historyUrl = 'http://localhost:5000/history'
const userUrl = 'http://localhost:5000/user'

export const fetchPlaylists = (id) => axios.get(`${playlistUrl}/${id}`);

export const createPlaylist = (newPlaylist) => axios.post(playlistUrl, newPlaylist);

export const updatePlaylist = (updatedPlaylist) => axios.patch(`${playlistUrl}/${updatedPlaylist.id}`, updatedPlaylist.playlist)

export const deletePlaylist = (data) => axios.delete(`${playlistUrl}/${data.id}`, {data: data})

export const fetchHistory = (id) => axios.get(`${historyUrl}/${id}`);

export const createHistory = (newHistory) => axios.post(historyUrl, newHistory)

export const updateHistory = (id, updatedHistory) => axios.patch(`${historyUrl}/${id}`, updatedHistory)

export const createUser = (userInfo) => axios.post(userUrl, userInfo)

export const login = (userInfo) => axios.post('http://localhost:5000/user/login', userInfo)

export const updateUserInfo = (userInfo) => axios.patch(userUrl, userInfo)

const searchUrl = 'https://www.googleapis.com/youtube/v3/search?key='
const API_KEY = 'AIzaSyDlnn9kjXhP8g6mrWbHZev0fivwxJQlOSA'
const searchParams = '&type=video&part=snippet&maxResults=14&q='

export const fetchSearch = (searchQuery) => axios.get(searchUrl + API_KEY + searchParams + searchQuery);


