
import express from 'express'
import {registerUser, authUser, updateUserInfo} from "../controllers/users.js";
import {authToken} from "../utils/authToken.js";

const router = express.Router();

router.post('/', registerUser)
router.post('/login', authUser)
router.patch('/', authToken, updateUserInfo)


export default router