const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const connectDB = require("./src/config/db");


app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.static("public")); //used for integrating frontend with backend
app.use(bodyParser.urlencoded({ extended: true }));

//this is used so that I can flash the error and success message on the page
app.use(
  session({
    secret: "Ourlittlesecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//this is for all routes and its code is in src/models/userModel.js
app.use("/", userRoutes);

connectDB();

const port = process.env.PORT || 3000;

//connecting server
app.listen(port, function () {
  console.log("Server Started");
});
