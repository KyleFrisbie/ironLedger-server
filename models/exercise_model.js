const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exercise_name: String,
    author: String,
});

const ExerciseModel = mongoose.model('exercise', exerciseSchema);

module.exports = ExerciseModel;