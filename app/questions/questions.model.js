const mongoose = require("mongoose");

const QuestionsSchema = mongoose.Schema(
  {
    QuestionAnswers: []
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("questions", QuestionsSchema);
