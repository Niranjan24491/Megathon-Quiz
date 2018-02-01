module.exports = function(app) {
  var answers = require("./answers.controller.js");

  // Create a new Note
  app.post("/answers", answers.create);

  // Retrieve all answers
  app.get("/answers", answers.findAll);
};
