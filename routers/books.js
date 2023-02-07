//here get the Module of bookController
const booksController = require("../controllers/book");
const isAuthModule = require("./gurdAuth");
const multer = require("multer");
//here we use express like a router
const router = require("express").Router();
//here just we use the Function that inside the bookController Module
router.get("/", booksController.threeBooksCon);
//here just we use the Function that inside the three books controller Module
router.get("/books", isAuthModule.isAuth, booksController.booksController);
router.get("/book/:id", isAuthModule.isAuth, booksController.oneBookCon);
router.get("/addbook", isAuthModule.isAuth, booksController.getaddBookCon);
router.post(
  "/addbook",
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cd) {
        cd(null, "assets/uploads");
      },
      filename: function (req, file, cd) {
        cd(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  isAuthModule.isAuth,
  booksController.postAddBook
);
//make a route for my Book to get Page
router.get("/mybook", isAuthModule.isAuth, booksController.myBooksCon);
//for delete book
router.get("/delete/:id", booksController.deleteBook);
//for get update book
router.get("/update/:id", isAuthModule.isAuth, booksController.updateBookCon);
//for post update book
router.post(
  "/update",
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cd) {
        cd(null, "assets/uploads");
      },
      filename: function (req, file, cd) {
        cd(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  isAuthModule.isAuth,
  booksController.postUpdateBook
);
//export the router
module.exports = router;
