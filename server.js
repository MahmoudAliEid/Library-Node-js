//Declaretion of  the varibles
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
//get the Router of Books
const router = require("./routers/books");
const regRoute = require("./routers/register");
//...........
mongoose.set("strictQuery", true);
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
//import the flash massege
const flash = require("connect-flash");
// .
// .
// space
// .
// .
//make new store
let store = new mongoDbStore({
  uri: "mongodb://localhost:27017/Library",
  collection: "mySessions",
});
// Catch errors
store.on("error", function (error) {
  console.log(error);
});

//Declare var of our server
const server = express();
//make static folder
server.use(express.static(path.join(__dirname, "assets")));
//set the Template Engine
server.set("view engine", "ejs");
//declare folder name
server.set("views", "views");
//use bodyparser
server.use(express.urlencoded({ extended: true }));
//use the store
server.use(
  session({
    secret: "this is my secret key milsjka;jnc;aiueiwohnn97732jfn",
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
// .
// .
// space
// .
// .
//use flash
server.use(flash());
//use the router of books
server.use("/", router);
server.use("/", regRoute);
// .
// .
// space
// .
// .
//about router
server.get("/about", (req, res, next) => {
  //render the file of about
  res.render("about", { verif: req.session.userId });
});
//contact router
server.get("/contact", (req, res, next) => {
  //render the file of contact
  res.render("contact", { verif: req.session.userId });
});
// .
// .
// space
// .
// .
//listen the server
server.listen(5000, () => console.log("Server runs in port 5000"));
