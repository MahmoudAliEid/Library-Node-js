//start Register Module
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//create the schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
//then create the model
const userModel = mongoose.model("user", userSchema);
//declare the url
var url = "mongodb://localhost:27017/Library";
//make the main function to export it
exports.AuthFunction = (theName, theEmail, thePassword) => {
  //make a promise
  return new Promise((resolve, reject) => {
    //conncet to mongoose
    mongoose
      .connect(url)
      .then(() => {
        //search for email in database
        return userModel.findOne({ email: theEmail });
      })
      .then((user) => {
        //check if the email exist or not
        if (user) {
          mongoose.disconnect();
          reject("this Email is already exist!");
        } else {
          let hpassword = bcrypt.hash(thePassword, 10);
          return hpassword;
        }
      })
      .then((hpassword) => {
        let user = new userModel({
          name: theName,
          email: theEmail,
          password: hpassword,
        });
        return user.save();
      })
      .then((user) => {
        //disconnect the mongoose
        mongoose.disconnect();
        resolve("the user was added successfully");
      })
      .catch((err) => {
        mongoose.disconnect();
        resolve(err);
      });
  });
};
//Function of login
exports.loginFunction = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        //search for email in database
        return userModel.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          //compare the password
          bcrypt
            .compare(password, user.password)
            .then((vertify) => {
              if (vertify) {
                mongoose.disconnect();
                resolve(user._id);
              } else {
                mongoose.disconnect();
                reject("Invalid Password");
              }
            })
            .catch((err) => reject(err));
        } else {
          mongoose.disconnect();
          reject("This Email isn't exist in our Database!!");
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
