// MongoDB Module
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// Game Schema
//= ===============================
const gameSchema = new Schema({
        browser_id: { type: String},
        history: {type: Array},
        step_number: {type: Number},
        x_is_next: {type: Boolean}
    },
    {
        timestamps: true,
        usePushEach: true
    });

module.exports = mongoose.model('Game', gameSchema);
