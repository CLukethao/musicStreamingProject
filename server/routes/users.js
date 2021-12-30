
import express from 'express'
import {registerUser, authUser, updateUserInfo} from "../controllers/users.js";

const router = express.Router();

router.post('/', registerUser)
router.post('/login', authUser)
router.patch('/', updateUserInfo)


export default router