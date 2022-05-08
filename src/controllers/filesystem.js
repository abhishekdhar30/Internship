 

 const filesystem=function(req,newfilename)
 {

    const fs = require("fs");
    const path = require("path");
     const actualpath = path.normalize(`${__dirname}/../../`);
     const User=require("../models/userModels")
     const csv = require("csv-parser");

 
 fs.readdir(`${actualpath}/uploads/`, (err, files) => {
   if (err) {
     console.log(err);
   }
   let initialfilename = req.file.originalname;

   const filePath = path.join(actualpath, `/uploads`, initialfilename);

   var myquery = { filename: newfilename };
   //for total count
   fileBuffer = fs.readFileSync(filePath);
   to_string = fileBuffer.toString();
   split_lines = to_string.split("\n");
   

   User.updateOne(
     myquery,
     { $set: { totalcount: split_lines.length - 2 } },
     function (err, res) {
       if (!err) {
         console.log("");
       }
       else
      console.log(err);
     }
   );
    //  ===================================================

  
   fs.createReadStream(filePath)
     .pipe(csv({}))
     .on("data", (data) => {

      let result = Object.keys(data).reduce(
        (prev, current) => ({
          ...prev,
          [current.toLowerCase()]: data[current],
        }),
        {}
      );

      if(result.email!=undefined)
      {
       
       if (result.email.length != 0) {
         User.updateOne(
           myquery,
           { $inc: { totalEmails: 1 } },
           function (err, res) {
             if (err) console.log(err);
             else console.log("");
             return;
           }
         );
       }
      }
     
      
     });
    

    return;
  });
 }

 module.exports=filesystem;