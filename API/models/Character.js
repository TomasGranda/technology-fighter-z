const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CharacterSchema = new Schema ({
    name: {
      type: String
    },
    icon: {
        type: String,
        required: true
    },
    life: {
        type: Number
    },
    defense: {
        type: Number
    },
    attack: {
        type: Number
    },
    speed: {
        type: Number
    },
    ultimate: {
        type: Number
    }
});

module.exports = mongoose.model('character', CharacterSchema);