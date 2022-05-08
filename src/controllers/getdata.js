const User = require("../models/userModels");

const getdata = function (req, res) {



  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("getdata", {users:user}); 
    }
  });
};

module.exports = getdata;
