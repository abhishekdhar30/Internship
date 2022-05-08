const multer = require("multer");
const path = require("path");

const loading = multer({ dest: "uploads/" });
const fs = require("fs");


//multer


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      fs.readdirSync(`uploads/`).forEach((file) => {
        fs.unlinkSync(`uploads/${file}`);
      });
    cb(null, `uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    
  },
});

//  const multerstorage = multer.memoryStorage();
//  console.log(multerstorage);

var upload = multer({storage:storage });

module.exports=upload
