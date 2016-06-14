const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workout_name: String,
    author: String,
});

const WorkoutModel = mongoose.model('workout', workoutSchema);

module.exports = WorkoutModel;