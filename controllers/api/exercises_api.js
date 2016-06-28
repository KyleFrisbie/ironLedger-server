const Exercise = require('../../models/exercise_model');

exports.getAllExercises = function (req, res, next) {
   const exercises = Exercise.find(function(err, exercises) {
      if (err) {
         return next(err);
      }
      return res.json({exercises});
   });
};

exports.insertExercise = function (req, res, next) {
   const exercise_name = req.body.exercise_name;
   const author = req.body.author;
   const exercise = new Exercise({
      exercise_name,
      author
   });
   exercise.save(function (err) {
      if (err) {
         return next(err)
      }
   });
   res.send({exercise});
};


exports.removeExercise = function (req, res, next) {
   const _id = req.body.exercise_id;
   Exercise.findByIdAndRemove(_id, function (err, exercise) {
      if (err) {
         return next(err);
      }
      return res.json({exercise});
   });
};