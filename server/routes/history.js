
import express from 'express'
import {createHistory, getHistory, updateHistory} from "../controllers/history.js";
import {authToken} from "../utils/authToken.js";
const router = express.Router();

router.get('/:id', authToken, getHistory);
router.post('/', authToken,createHistory)
router.patch('/:id', authToken, updateHistory)


export default router;