import axios from 'axios';

const url = 'http://localhost:5000/playlists';
// const url = 'http://127.0.0.1:5000/playlists';

export const fetchPlaylists = () => axios.get(url);

export const createPlaylist = (newPlaylist) => axios.post(url, newPlaylist);