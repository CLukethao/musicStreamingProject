import express from 'express'
import {getPlaylists, createPlaylist, updatePlaylist} from "../controllers/playlist.js";

const router = express.Router();

router.get('/', getPlaylists);
router.post('/', createPlaylist);
router.patch('/:id', updatePlaylist)

export default router;