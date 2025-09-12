import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gameDescription: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        enum: [
            'none',
            'bronze',
            'silver',
            'gold',
            'platinum',
            'diamond',
            'crown',
            'ace',
            'aceMaster',
            'aceDominator',
            'conqueror'
        ]
    },
    Time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gameLive: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    }
});

const tournamentSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    live: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    games: [gameSchema]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
