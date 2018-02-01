const Answers = require("./answers.model.js");

exports.create = function(req, res) {
  // Create and Save a new answers me text
  if (!req.body.Answers) {
    res.status(400).send({ message: "answers can not be empty" });
  } else {
    const answers = new Answers({
      responseData: {
        UserName: req.body.UserName,
        EmailId: req.body.EmailId,
        Answers: req.body.Answers
      }
    });

    answers.save(function(err, data) {
      console.log("Data in Save" + data);
      if (err) {
        console.log("Error in save" + err);
        res.status(500).send({
          message: "Some error occurred while creating the answers me text."
        });
      } else {
        res.status(200).send({ message: "Data saved successfully" });
      }
    });
  }
};

exports.findAll = function(req, res) {
  // Retrieve and return all notes from the database.
  Answers.find(function(err, notes) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving notes." });
    } else {
      res.send(notes);
    }
  });
};
