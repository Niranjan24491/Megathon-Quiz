module.exports = function(app) {
  var userData = require("./userData.controller.js");

  // Create a new Note
  app.post("/userData", userData.create);

  // Retrieve all about
  app.get("/userData", userData.findAll);
};
