import mongoose from "mongoose";

const historySchema = mongoose.Schema({
    date: String,
    songs: Array
});

const History = mongoose.model('History', historySchema)

export default History;