//responsable for connect
const booksModel = require("../models/book");
//exports the Function to recive it in router module
exports.booksController = (req, res, next) => {
  //we get the function of getBooks to recive the returned data form it
  //and send this data to the index.ejs file as books varible
  booksModel.getBooks().then((books) => {
    res.render("books", { books: books, verif: req.session.userId });
  });
};
// .
// .
// space
// .
// .
//function responsalbe for return 3 books
exports.threeBooksCon = (req, res, next) => {
  booksModel.getThreeBooks().then((books) => {
    res.render("index", { books: books, verif: req.session.userId });
  });
};
// .
// .
// space
// .
// .
exports.oneBookCon = (req, res, next) => {
  let id = req.params.id;
  booksModel.getOneBook(id).then((book) => {
    res.render("details", { book: book, verif: req.session.userId });
  });
};
//get add Book Page
exports.getaddBookCon = (req, res, next) => {
  res.render("addBook", {
    verif: req.session.userId,
    Smessage: req.flash("Smessage")[0],
    Emessage: req.flash("Emessage")[0],
  });
};
//Function of post data in server
exports.postAddBook = (req, res, next) => {
  booksModel
    .addBookModel(
      req.body.title,
      req.body.price,
      req.body.description,
      req.body.author,
      req.file.filename,
      req.session.userId
    )
    .then((bookMsg) => {
      req.flash("Smessage", bookMsg);
      res.redirect("addbook");
    })
    .catch((err) => {
      req.flash("Emessage", err);
      res.redirect("addbook");
    });
};
//function to controller the my books page
exports.myBooksCon = (req, res, next) => {
  booksModel.getMyBooks(req.session.userId).then((myBooks) => {
    res.render("mybook", {
      verif: req.session.userId,
      books: myBooks,
      message: req.flash("message")[0],
    });
  });
};
//function to controller the Delete a Book
exports.deleteBook = (req, res, next) => {
  var id = req.params.id;
  booksModel.deleteBook(id).then((msg) => {
    req.flash("message", msg);
    res.redirect("/mybook");
  });
};
//for get updata Book Page
exports.updateBookCon = (req, res, next) => {
  var idOfBook = req.params.id;
  booksModel.updateBook(idOfBook).then((book) => {
    res.render(`update`, {
      verif: req.session.userId,
      book: book,
      message: req.flash("Umessage")[0],
    });
  });
};
//for post update book Page
exports.postUpdateBook = (req, res, next) => {
  var id = req.body.id;
  console.log(id);
  // make Sure if the user input a new photo or not
  if (req.file) {
    //if the user add a new photo then do this
    booksModel
      .postUpdateBookModel(
        id,
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.author,
        req.file.filename,
        req.session.userId
      )
      .then((msg) => {
        req.flash("Umessage", msg);
        res.redirect(`update/${id}`);
      });
  } else {
    // if the user doesn't add any new photo then add the old Photo I get it by hidden input
    booksModel
      .postUpdateBookModel(
        id,
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.author,
        req.body.oldImage,
        req.session.userId
      )
      .then((msg) => {
        req.flash("Umessage", msg);
        res.redirect(`update/${id}`);
      });
  }
};
