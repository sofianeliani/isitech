const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  credentialDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;