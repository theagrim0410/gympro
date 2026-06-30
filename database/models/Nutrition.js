const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  title: String,
  protein: String,
  carbs: String,
  fats: String,
  description: String,
});

module.exports = mongoose.model("Nutrition", nutritionSchema);