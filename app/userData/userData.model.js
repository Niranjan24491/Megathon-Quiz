const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema(
  {
    UserData: []
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", UserDataSchema);
