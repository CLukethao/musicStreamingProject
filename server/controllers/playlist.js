
import User from "../models/user.js";
import mongoose from "mongoose";


export const getPlaylists = async (req, res) => {
    try {
        const {id: _id} = req.params

        const user = await User.findById(_id)

        const playlists = user.playlists

        res.status(200).json(playlists)
    }

    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPlaylist = async (req, res) => {

    const { playlistName: playlistName, id: _id} = req.body;

    const newPlaylist = {playlistName: playlistName, songs: []}

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No User with that Id')
    }

    try {
        const user = await User.findByIdAndUpdate(_id, {$push: {"playlists": newPlaylist}}, {new: true});
        console.log(user.playlists)
        res.json(user.playlists)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const updatePlaylist = async (req, res) => {

    const { id: _id } = req.params;
    const updatedPlaylist = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No User with that Id')
    }

    try {
        const user = await User.findByIdAndUpdate(_id, {playlists: updatedPlaylist}, {new: true})

        res.json(user.playlists)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const deletePlaylist = async (req, res) => {
    const { id: _id} = req.params;
    const {playlistId: playlistId} = req.body;



    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No User with that Id')
    }

    try {
        const user = await User.findByIdAndUpdate(_id, {$pull: {"playlists": {_id: playlistId}}}, {new: true})
        res.json(user.playlists)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }
    // const updatedPlaylists = await User.findByIdAndDelete(_id);

    // res.json(updatedPlaylists)
}

// export const getPlaylists = async (req, res) => {
//     try {
//         const playlists = await Playlist.find()
//
//         res.status(200).json(playlists)
//     }
//
//     catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }
//
// export const createPlaylist = async (req, res) => {
//
//     const playlist = req.body;
//
//     const newPlaylist = new Playlist(playlist)
//
//     try {
//
//         await newPlaylist.save()
//
//         res.status(201).json(newPlaylist)
//     }
//
//     catch (error) {
//         res.status(409).json({message: error.message});
//     }
// }
//
// export const updatePlaylist = async (req, res) => {
//
//     const { id: _id } = req.params;
//     const playlist = req.body;
//
//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send('No playlist with that Id')
//     }
//
//     const updatedPlaylist = await Playlist.findByIdAndUpdate(_id, playlist, {new: true});
//
//     res.json(updatedPlaylist)
//
// }
//
// export const deletePlaylist = async (req, res) => {
//     const { id: _id } = req.params;
//
//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send('No playlist with that Id')
//     }
//
//     const updatedPlaylists = await Playlist.findByIdAndDelete(_id);
//
//     res.json(updatedPlaylists)
// }