const User = require("../models/userModels");
const upload = require("../multer/multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const uploadingFileToS3 = require("../S3/code");
const { ValidateName, ValidateEmail } = require("../validations/validation");
const { nextTick } = require("process");

const fileupload = function (req, res) {
  res.render("fileupload", {
    success: req.flash("success"),
    danger: req.flash("error"),
  });
};

const postfileupload = async function (req, res,callback) {
  upload.single("file")(req, res, async function (err) {
    if (err) {
      req.flash("error", "Multer error");
      res.redirect("/");
    } 
    else 
    {
       if (req.file == undefined) {
         req.flash(
           "error",
           "Error Form Submission: Input marked as * cannot be empty !"
         );
          res.redirect("/");
       } 

       else{

      var ext = path.extname(req.file.originalname);
      if (ext !== ".csv" && ext !== ".CSV") {
        req.flash("error", " Only .csv files are allowed");
        res.redirect("/");
      } else {
        const { name, email, domain, area, message } = req.body;


                if (
                 name.length == 0 ||
                 email.length == 0 ||
                 domain.length == 0 ||
                 area.length == 0 ||
                 message.length == 0
               ) {
                 req.flash(
                   "error",
                   "Error Form Submission: Input marked as * cannot be empty !"
                 );
                  res.redirect("/");
               } else if (!ValidateName(name)) {
                 req.flash(
                   "error",
                   "Error: Invalid name..It must only contains (a-z, A-Z) !"
                 );
                  res.redirect("/");
               } else if (!ValidateEmail(email)) {
                 req.flash(
                   "error",
                   "Error: Invalid email..It must contains('@' and '.') !"
                 );
                  res.redirect("/");
               } else if (!ValidateName(area)) {
                 req.flash(
                   "error",
                   "Error: Invalid Area..It must only contains (a-z, A-Z) !"
                 );
                  res.redirect("/");
               } else if (req.file === undefined) {
                 req.flash(
                   "error",
                   "Error Form Submission: Input marked as * cannot be empty !"
                 );
                  res.redirect("/");
               } else {



                       const actualpath = path.normalize(`${__dirname}/../../`);
                       let initialfilename = req.file.originalname;
                       const filePath = path.join(
                         actualpath,
                         `/uploads`,
                         initialfilename
                       );

                  

fs.createReadStream(filePath)
  .pipe(csv())
  .on("headers", (headers) => {
     let a=[];
    headers.forEach(function(header){
     a.push(header.toLowerCase());
    })
     let f=0;
     let size=a.length;
     let count=1;
     a.forEach(function(field){
         if(field=="email")
         {
             f=1;
              let url = fs.readFileSync(
                `${actualpath}/uploads/${req.file.originalname}`
              );
            
              uploadingFileToS3(req, url);
              req.flash("success", "Success! Your data is recorded !");
             res.redirect("/"); 
               return;
             
         }
         else if(count===size)
         {
             req.flash(
               "error",
               "Error! You have uploaded a wrong file..It must contains Email field!"
             );
             res.redirect("/"); 
         }
         count++;
      })
      

  })

  
       
   
 
    
     
  // .on("complete",function(){
  //   console.log("jjj");
  //   if(f===1)
  //   {
  //          let url = fs.readFileSync(
  //            `${actualpath}/uploads/${req.file.originalname}`
  //          );

  //          uploadingFileToS3(req, url);
  //          req.flash("success", "Success! Your data is recorded !");
  //   }
  //   else if(f===0)
  //   {
  //     req.flash("error", "Error! ");
  //   }
  // })
                     
                        
                  
                         
                        
                        // let url = fs.readFileSync(
                        //   `${actualpath}/uploads/${req.file.originalname}`
                        // );

                        // uploadingFileToS3(req, url);
                        // req.flash(
                        //   "success",
                        //   "Success! Your data is recorded !"
                        // );
                        
                      
                      
                       
                         
               }
                
          
    }
  }
  // res.redirect("/");


    }
  });
};

module.exports = { fileupload, postfileupload };
