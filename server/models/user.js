const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
  },
  email: {
    type: String,
    requred: true,
  },
  password: {
    type: String,
    requred: true,
  },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
