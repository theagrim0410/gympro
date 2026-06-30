const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: String,
  username: String,
  category: {
    type: String,
    enum: ["Technical Issue", "Workout Accuracy", "Billing", "Other"],
  },
  subject: String,
  description: String,
  status: {
    type: String,
    default: "Pending",
    enum: ["Open", "Pending", "In Review", "Resolved"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);