import User from "../models/user.js";
import asyncHandler from 'express-async-handler'
import mongoose from "mongoose";
import {generateToken} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {

    try {
        const { name, email, dob, password } = req.body;

        const user = await User.create({
            name,
            email,
            dob,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                dob: user.dob,
                email: user.email,
                token: generateToken(user._id)
            })
        }

    }

    catch (error) {
        if (error.code === 11000) {
            return res.json({status: 'error', error:'Email already in use'})
        }

        throw error
    }
}

export const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
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