import axios from 'axios';
import { TrackModel } from '../models/track.model.js';
import { CONFLICT } from '../constants/httpStatus.js';
import { UserModel } from '../models/user.model.js';

export const getMusic = async (req, res) => {
    const { searchTerm } = req.params;
    const response = await axios.get(`https://api.deezer.com/search/track?q=${searchTerm}`);
    res.send(response.data);
}

export const saveMusic = async (req, res) => {
    const music = req.body;

    // Verificar si ya existe
    const trackDB = await TrackModel.findOne({ title: music.title });

    if (trackDB) {
        res.status(CONFLICT).send('Esta canción ya fue marcada como favorita');
        return;
    }

    // crea una muscia/track
    const newMusic = new TrackModel({ ...music, user: req.user.id });
    await newMusic.save();
    res.send(newMusic);
}

export const getFavorites = async (req, res) => {

    if(!req?.user?.id){
        return;
    }

    const user = await UserModel.findById(req.user.id);
    const filter = {
        user: user._id
    };

    const favorites = await TrackModel.find(filter).sort('-createdAt');
    res.send(favorites);
}