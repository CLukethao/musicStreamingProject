
import History from "../models/history.js";
import mongoose from "mongoose";



export const getHistory = async (req, res) => {
    try {
        const history = await History.find()

        res.status(200).json(history)
    }

    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createHistory = async (req, res) => {

    const history = req.body;

    const newHistory = new History(history)

    try {

        await newHistory.save()

        res.status(201).json(newHistory)
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

    const updatedHistory = await History.findByIdAndUpdate(_id, history, {new: true});

    res.json(updatedHistory)

}