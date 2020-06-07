const bodyParser = require("body-parser");
const express = require("express");
const request= require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName= req.body.fname;
  const lastName= req.body.lname;
  const emailId = req.body.email;
  const data ={
    members:[
      {
        email_address: emailId,
        status: "subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName
        }


      }
    ]
  };
  var jsonData= JSON.stringify(data);
  const url ="https://us10.api.mailchimp.com/3.0/lists/31ce3b7f5f";
  const options = {
    method : "POST",
    auth : "riya1:48d2b85c97d31d27cc0b168a517d4c01-us10"
  }

  const request=https.request(url, options ,function(response){
    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

//  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("server is running")
});
//48d2b85c97d31d27cc0b168a517d4c01-us10
//31ce3b7f5f
