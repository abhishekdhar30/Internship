const express = require("express");
const {checkstrength, postcheckstrength} = require("../controllers/checkstrength");
const {fileupload, postfileupload} = require("../controllers/fileupload");
const getdata = require("../controllers/getdata");



//set up express router
const router=express.Router();


router.route("/strength").get(checkstrength).post(postcheckstrength);

router.route("/").get(fileupload).post(postfileupload);

router.route("/getdata").get(getdata);



module.exports = router;