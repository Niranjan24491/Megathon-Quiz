const UserData = require("./userData.model.js");

exports.create = function(req, res) {
  // Create and Save a new About me text
  if (!req.body.UserData) {
    res.status(400).send({ message: "user details can not be empty" });
  } else {
    const userData = new UserData({
      UserData: req.body.UserData
    });

    userData.save(function(err, data) {
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
  UserData.find(function(err, notes) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving notes." });
    } else {
      res.send(notes);
    }
  });
};
