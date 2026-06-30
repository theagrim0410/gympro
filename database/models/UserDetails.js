const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    workoutStreak: {
      type: Number,
      default: 0,
    },

    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150?img=2", // You can set a default avatar image
    },

    workouts: {
        type: Number,
        default: 0,
    },
    
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("UserDetails", userDetailsSchema);