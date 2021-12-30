import User from "../models/user.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
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
            res.json({status: 'error', error: 'Invalid email or password'})
            throw new Error('invalid email or password')
        }
    }



    catch (error) {
        console.log(error)
    }

})

export const updateUserInfo = async (req, res) => {

    const updatedUserInfo = req.body;

    if (!mongoose.Types.ObjectId.isValid(updatedUserInfo._id)) {
        return res.status(404).send('No User with that Id')
    }

    try {
        const user = await User.findById(updatedUserInfo._id)
        const userInfo = user.userInfo

        if (updatedUserInfo.email !== userInfo.email) {
            const dupeEmail = await User.findOne({ "userInfo.email": updatedUserInfo.email});

            if (dupeEmail === null) {
                await User.findByIdAndUpdate(updatedUserInfo._id,{"userInfo.email": updatedUserInfo.email}, {new: true})
            }

            else {
                return res.json({updated:'error'})
            }
        }

        if (updatedUserInfo.name !== userInfo.name) {
            await User.findByIdAndUpdate(updatedUserInfo._id,{"userInfo.name": updatedUserInfo.name}, {new: true})
        }

        if (updatedUserInfo.password !== '') {

            const salt = await bcrypt.genSalt(10);

            updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, salt);

            await User.findByIdAndUpdate(updatedUserInfo._id,{"userInfo.password": updatedUserInfo.password}, {new: true})
        }

        const updatedUser = await User.findById(updatedUserInfo._id)

        res.json({
            _id: updatedUser._id,
            name: updatedUser.userInfo.name,
            email: updatedUser.userInfo.email,
            token: generateToken(updatedUser._id),
            updated: 'success'
        })

    }

    catch (error) {
        res.status(409).json({message: error.message});
    }
}