const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    age: Number,
})

module.exports = mongoose.model('Director', movieSchema);
