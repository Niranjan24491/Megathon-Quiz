const mongoose = require("mongoose");

const AnswersSchema = mongoose.Schema({
  responseData: {
    UserName: String,
    EmailId: String,
    Answers: Array
  }
});

module.exports = mongoose.model("Answers", AnswersSchema);
