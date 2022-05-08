const filesystem = require("../controllers/filesystem");



function uploadingFileToS3(req,url) {

  const AWS=require("aws-sdk");
   const User = require("../models/userModels");

  const my_AWSAccessKeyId = process.env.AWSAccessKeyId;
  const my_AWSSecretKey = process.env.AWSSecretKey;
  const aws_region = process.env.region;

  AWS.config.update({
    region: aws_region,
    accessKeyId: my_AWSAccessKeyId,
    secretAccessKey: my_AWSSecretKey,
  });

  var s3=new AWS.S3();


  let newfilename=`${req.body.domain}_${req.body.area}_${Date.now()}.csv`;
  var date=new Date
  console.log(date.toLocaleString());

  let params = {
    Bucket: process.env.AWS_BUCKET,
    Key: newfilename,
    Body:url
  };

  s3.upload(params, async(err,result)=>{
    if(err) {
      console.log(err);
    } else {
      
       const { name, email, domain, area, message } = req.body;
      

       const user = new User({
         name: name,
         email: email,
         area: area,
         domain: domain,
         message: message,
         filename: newfilename,
         link: result.Location,
       });
       user.save()
       .then(function()
       {
         filesystem(req,newfilename);
       });


      
     
    
    }
  })
}

module.exports=uploadingFileToS3;