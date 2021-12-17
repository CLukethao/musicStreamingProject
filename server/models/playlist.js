import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    playlistName: String,
    songs: Array
});

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist;