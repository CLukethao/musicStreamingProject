
import express from 'express'
import {createHistory, getHistory, updateHistory} from "../controllers/history.js";
const router = express.Router();

router.get('/:id', getHistory);
router.post('/', createHistory)
router.patch('/:id', updateHistory)


export default router;