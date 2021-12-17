
export default (playlists = [], action) => {
    switch (action.type) {

        case 'FETCH_ALL_PLAYLISTS':
            return action.payload;

        case 'CREATE_PLAYLIST':
            return [...playlists, action.payload];

        default:
            return playlists;
    }
}