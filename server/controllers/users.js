import User from "../models/user.js";
import asyncHandler from 'express-async-handler'
import mongoose from "mongoose";
import {generateToken} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { userInfo } = req.body;

    try {

        const user = await User.create({
            userInfo

        });

        res.status(201).json({

            _id: user._id,
            userInfo: user.userInfo

        })

    }

    catch (error) {
        if (error.code === 11000) {
            return res.json({status: 'error', error:'Email already in use'})
        }

        else {
            console.log(error.message)
            res.status(409).json({message: error.message});
        }
    }
}

export const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({ "userInfo.email": email});

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.userInfo.name,
                email: user.userInfo.email,
                token: generateToken(user._id)
            })
        }

        else {
            res.status(400);
            throw new Error('invalid email or password')
        }
    }



    catch (error) {
        console.log(error)
        res.json('invalid email or password')
    }

})