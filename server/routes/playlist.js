import express from 'express'
import {getPlaylists, createPlaylist, updatePlaylist, deletePlaylist} from "../controllers/playlist.js";
import {authToken} from "../utils/authToken.js";

const router = express.Router();

router.get('/:id', authToken, getPlaylists);
router.post('/', createPlaylist);
router.patch('/:id', authToken, updatePlaylist);
router.delete('/:id', deletePlaylist);

export default router;