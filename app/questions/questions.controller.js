const Questions = require("./questions.model.js");

exports.create = function(req, res) {
  // Create and Save a new About me text
  if (!req.body.QuestionAnswers) {
    res.status(400).send({ message: "user details can not be empty" });
  } else {
    const questions = new Questions({
      QuestionAnswers: req.body.QuestionAnswers
    });

    questions.save(function(err, data) {
      console.log("Data in Save" + data);
      if (err) {
        console.log("Error in save" + err);
        res.status(500).send({
          message: "Some error occurred while creating the ABout me text."
        });
      } else {
        res.status(200).send({ message: "Data saved successfully" });
      }
    });
  }
};

exports.findAll = function(req, res) {
  // Retrieve and return all notes from the database.
  Questions.find(function(err, notes) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving notes." });
    } else {
      res.send(notes);
    }
  });
};
