const mongoose = require("mongoose");

//structure of database
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    domain: {
      type: String,
    },
    area: {
      type: String,
    },
    message: {
      type: String,
    },
    totalcount: {
      type: Number,
      default: 0,
    },
    totalEmails: {
      type: Number,
      default: 0,
    },
    filename:{
      type:String
    },
    link:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
