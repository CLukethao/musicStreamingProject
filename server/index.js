import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

import playlist from "./routes/playlist.js";
import history from "./routes/history.js"
import user from './routes/users.js'


const app = express();
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', user)
app.use('/playlists', playlist)
app.use('/history', history)



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('Server running')))
    .catch((error) => console.log(error.message));

