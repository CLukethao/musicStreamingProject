import express from 'express'
// import {getPlaylists, createPlaylist, updatePlaylist, deletePlaylist} from "../controllers/playlist.js";
import {getPlaylists, createPlaylist, updatePlaylist, deletePlaylist} from "../controllers/playlist.js";

const router = express.Router();

router.get('/:id', getPlaylists);
router.post('/', createPlaylist);
router.patch('/:id', updatePlaylist)
router.delete('/:id', deletePlaylist)

export default router;