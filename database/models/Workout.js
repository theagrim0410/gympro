const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to image
    required: true,
  },
  video: {
    type: String, // URL to video
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  repetitions: {
    type: Number,
    required: true,
  },
  restTime: {
    type: Number, // seconds
    required: true,
  },
  steps: [
    {
      type: String,
    },
  ],
  mistake: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);