//creat the router
const theRouter = require("express").Router();
const body = require("express").urlencoded({ extended: true });
const isAuthModule = require("./gurdAuth");
//import the controllers
const regController = require("../controllers/registerCon");
//make the routers for register
theRouter.get(
  "/register",
  isAuthModule.notAuth,
  regController.getRissterPageCon
);
theRouter.post("/register", body, regController.registerCon);
//make the routers for login
theRouter.get("/login", isAuthModule.notAuth, regController.getLoginPageCon);
theRouter.post("/login", body, regController.loginCon);
//make the router for logout
theRouter.post("/logout", body, regController.logoutFuctionCon);
module.exports = theRouter;
