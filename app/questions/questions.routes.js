module.exports = function(app) {
  var questions = require("./questions.controller.js");

  // Create a new Note
  app.post("/questions", questions.create);

  // Retrieve all about
  app.get("/questions", questions.findAll);
};
