
import User from "../models/user.js";
import mongoose from "mongoose";


export const getHistory = async (req, res) => {
    try {
        const {id: _id} = req.params

        const user = await User.findById(_id)

        const history = user.history

        res.status(200).json(history)
    }

    catch (error) {
        res.status(404).json({message: error.message});
    }
}


export const createHistory = async (req, res) => {

    const { date: date, id: _id} = req.body;

    const newHistory = {date: date, songs: []}

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No User with that Id')
    }

    try {
        const user = await User.findByIdAndUpdate(_id, {$push: {"history": newHistory}}, {new: true});
        res.json(user.history)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const updateHistory = async (req, res) => {

    const { id: _id } = req.params;
    const history = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No history with that Id')
    }

    try {
        await User.findByIdAndUpdate(_id, {$pop: {history: 1}}, {new: true})
        await User.findByIdAndUpdate(_id, {$push: {history: history}}, {new: true})
        res.json(history)
    }

    catch (error) {
        res.status(409).json({message: error.message});
    }
}