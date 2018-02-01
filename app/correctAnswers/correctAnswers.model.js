const mongoose = require("mongoose");

const CorrectAnswersSchema = mongoose.Schema(
  {
    correctAnswers: []
  },
  { collection: "correctAnswers" }
);

module.exports = mongoose.model("correctAnswers", CorrectAnswersSchema);
