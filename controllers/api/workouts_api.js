const Workout = require('../../models/workout_model');

exports.getAllWorkouts = function (req, res, next) {
   const workouts = Workout.find(function(err, workouts) {
      if (err) {
         return next(err);
      }
      return res.json({workouts});
   });
};

exports.insertWorkout = function (req, res, next) {
   const workout_name = req.body.workout_name;
   const author = req.body.author;
   const workout = new Workout({
      workout_name,
      author
   });
   workout.save(function (err) {
      if (err) {
         return next(err)
      }
   });
   res.send({workout});
};


exports.removeWorkout = function (req, res, next) {
   const _id = req.body.workout_id;
   console.log("_id: ", _id);
   Workout.findOne({id: _id}).remove( function (err, workout) {
      console.log("workout: ", workout);
      if (err) {
         return next(err);
      }
      return res.json({workout});
   }).exec();
};