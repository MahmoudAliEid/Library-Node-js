//create a Middel Ware for check if there is a login user or not
//use for this a var=>req.session.usrId  if == null or == true
//I use this function to apear a links only for login users
exports.isAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("login");
  }
};
//I use this function to disapear the links of longin and register when there is a lonin user
exports.notAuth = (req, res, next) => {
  //if thire is a user and requist the login page redirct him to home page
  if (req.session.userId) {
    res.redirect("/");
  } else {
    //else if thire isn't a user and requist the Login page do next() function
    //to do the next middel ware
    next();
  }
};
