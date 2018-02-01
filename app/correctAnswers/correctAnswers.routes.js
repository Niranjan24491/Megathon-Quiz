module.exports = function(app) {
  var correctAnswers = require("./correctAnswers.controller.js");

  // Create a new Note
  app.post("/correctAnswers", correctAnswers.create);

  // Retrieve all correctAnswers
  app.get("/correctAnswers", correctAnswers.findAll);
};
