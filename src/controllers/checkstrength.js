const storage = require("node-sessionstorage");

const User = require("../models/userModels");

storage.setItem("userInfo", {
 domain:null,
 area:null,
});


const checkstrength = function (req, res) {
  let user = storage.getItem("userInfo");



  User.find({},function(err,elements){

   if (err) {
     console.log(err);
   } else {
     
   let Areas = new Set();
   let Domains=new Set();
    let total=0;
    let totalemails=0;
     let accuracy = 0;
      

      if(elements)
      {


          for(let i=0;i<elements.length;i++)
         {
            Areas.add(elements[i].area);
            Domains.add(elements[i].domain);

             
            if ( elements[i].area == user.area && elements[i].domain == user.domain ) {
                 
                  total += elements[i].totalcount;
                  totalemails+=elements[i].totalEmails;
            }


         }
          res.render("checkstrength", {
            total: total,
            totalemails: totalemails,
            accuracy: accuracy,
            Areas: Areas,
            Domains: Domains,
          });
      }
     
storage.setItem("userInfo", {
  domain: null,
  area: null,
});

    
   }
 });
  
};

const postcheckstrength = function (req, res,next) {

// console.log(req.body);
storage.setItem("userInfo", {
  domain: req.body.domain,
  area: req.body.area,
});


  res.redirect("/strength");
};

module.exports = { checkstrength, postcheckstrength };
