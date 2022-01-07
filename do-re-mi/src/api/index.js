import axios from 'axios';

axios.defaults.baseURL = 'https://do-re-mi-music.herokuapp.com/'

const playlistUrl = 'playlists';
const historyUrl = 'history'
const userUrl = 'user'


export const fetchPlaylists = (id, token) => axios.get(`${playlistUrl}/${id}`, {headers: {'authorization': `Bearer ` + token}});

export const createPlaylist = (newPlaylist, token) => axios.post(playlistUrl, newPlaylist, {headers: {'authorization': `Bearer ` + token}});

export const updatePlaylist = (updatedPlaylist, token) => axios.patch(`${playlistUrl}/${updatedPlaylist.id}`, updatedPlaylist.playlist, {headers: {'authorization': `Bearer ` + token}})

export const deletePlaylist = (data, token) => axios.delete(`${playlistUrl}/${data.id}`, {data: data, headers: {'authorization': `Bearer ` + token}})

export const fetchHistory = (id, token) => axios.get(`${historyUrl}/${id}`, {headers: {'authorization': `Bearer ` + token}});

export const createHistory = (newHistory, token) => axios.post(historyUrl, newHistory,{headers: {'authorization': `Bearer ` + token}} )

export const updateHistory = (id, updatedHistory, token) => axios.patch(`${historyUrl}/${id}`, updatedHistory, {headers: {'authorization': `Bearer ` + token}})

export const createUser = (userInfo) => axios.post(userUrl, userInfo)

export const login = (userInfo) => axios.post('user/login', userInfo)

export const updateUserInfo = (userInfo) => axios.patch(userUrl, userInfo, {headers: {'authorization': `Bearer ` + userInfo.token}})

const searchUrl = 'https://www.googleapis.com/youtube/v3/search?key='
const API_KEY = 'AIzaSyDlnn9kjXhP8g6mrWbHZev0fivwxJQlOSA'
const searchParams = '&type=video&part=snippet&maxResults=14&q='

export const fetchSearch = (searchQuery) => axios.get(searchUrl + API_KEY + searchParams + searchQuery);


