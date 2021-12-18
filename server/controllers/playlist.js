
import Playlist from "../models/playlist.js";
import mongoose from "mongoose";

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

export const updatePlaylist = async (req, res) => {

    const { id: _id } = req.params;
    const playlist = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No playlist with that Id')
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(_id, playlist, {new: true});

    res.json(updatedPlaylist)

}
