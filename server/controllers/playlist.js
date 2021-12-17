
import Playlist from "../models/playlist.js";

export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find()

        res.status(200).json(playlists)
    }

    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPlaylist = async (req, res) => {

    const playlist = req.body;

    const newPlaylist = new Playlist(playlist)

    try {

        await newPlaylist.save()

        res.status(201).json(newPlaylist)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }
}
