const registerModule = require("../models/register");
//function of get the register
exports.getRissterPageCon = (req, res, next) => {
  res.render("register", {
    verif: req.session.userId,
    massege: req.flash("error")[0],
  });
};
//make the main function
exports.registerCon = (req, res, next) => {
  registerModule
    .AuthFunction(req.body.name, req.body.email, req.body.password)
    .then(() => {
      res.redirect("login");
    })
    .catch((err) => {
      req.flash("error", err);
      res.redirect("register");
    });
};
//function of login get the page
exports.getLoginPageCon = (req, res, next) => {
  res.render("login", {
    verif: req.session.userId,
    massege: req.flash("error")[0],
  });
};
//make the main function of post the data in Database
exports.loginCon = (req, res, next) => {
  registerModule
    .loginFunction(req.body.email, req.body.password)
    .then((id) => {
      req.session.userId = id;
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error", err);
      res.redirect("login");
    });
};
//make the main function of logout
exports.logoutFuctionCon = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("login");
  });
};
