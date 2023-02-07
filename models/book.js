// responsable for Database
const mongoose = require("mongoose");
//create the schema
var booksSchema = mongoose.Schema({
  title: String,
  price: Number,
  discreption: String,
  author: String,
  image: String,
  userId: String,
});
//declare the url
var url = "mongodb://localhost:27017/Library";
//create the model
var booksModel = mongoose.model("book", booksSchema);
//create the main Function
exports.getBooks = () => {
  //to make it return promise when use it in controller
  return new Promise((resolve, reject) => {
    //here connect to database
    mongoose
      .connect(url)
      .then(() => {
        //here find all books
        return booksModel.find({});
      })
      .then((books) => {
        //and then receve this data that has returned and disconnect the connection
        mongoose.disconnect();
        //the resolve the data or send the date or return the data
        resolve(books);
      })
      .catch((err) => {
        //here we check if there is any errors and return this errors
        reject(err);
      });
  });
};
//function for return 3 books
exports.getThreeBooks = () => {
  //declare or make this function return new  promise
  return new Promise((resolve, reject) => {
    //conect to the mongoose
    mongoose
      .connect(url)
      .then(() => {
        return booksModel.find({}).limit(3);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};
//function for get one book
exports.getOneBook = (id) => {
  return new Promise((resolve, reject) => {
    //conect to the  mongoose
    mongoose
      .connect(url)
      .then(() => {
        return booksModel.findById(id);
      })
      .then((book) => {
        mongoose.disconnect();
        resolve(book);
      })
      .catch((err) => reject(err));
  });
};
//Function for add book
exports.addBookModel = (title, price, description, author, image, userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        let book = new booksModel({
          title: title,
          price: price,
          discreption: description,
          author: author,
          image: image,
          userId: userId,
        });
        return book.save();
      })
      .then((book) => {
        mongoose.disconnect();
        resolve("The Book was add successfully!");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err, "The Book wasn't add!!");
      });
  });
};
//function to get my books
//create the main Function
exports.getMyBooks = (id) => {
  //to make it return promise when use it in controller
  return new Promise((resolve, reject) => {
    //here connect to database
    mongoose
      .connect(url)
      .then(() => {
        //here find all books
        return booksModel.find({ userId: id });
      })
      .then((books) => {
        if (books) {
          //and then receve this data that has returned and disconnect the connection
          mongoose.disconnect();
          //the resolve the data or send the date or return the data
          resolve(books);
        } else {
          mongoose.disconnect();
          reject("No Book was added yet!!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//function to make a model to delete one book
exports.deleteBook = (id) => {
  //to make it return promise when use it in controller
  return new Promise((resolve, reject) => {
    //here connect to database
    mongoose
      .connect(url)
      .then(() => {
        //here find all books
        return booksModel.deleteOne({ _id: id });
      })
      .then((books) => {
        //and then receve this data that has returned and disconnect the connection
        mongoose.disconnect();
        //the resolve the data or send the date or return the data
        resolve("the Book was Deleted!");
      })
      .catch((err) => {
        //here we check if there is any errors and return this errors
        reject(err);
      });
  });
};
//function to get the book of book update
exports.updateBook = (id) => {
  //make this functio to return a promise
  return new Promise((resolve, reject) => {
    //conect to mongoose
    mongoose
      .connect(url)
      .then(() => {
        //Search for the book by it's id
        return booksModel.findById(id);
      })
      .then((book) => {
        //disconnect the mongoose server
        mongoose.disconnect();
        //resolve the data or the book that found it
        resolve(book);
      })
      .catch((err) => reject(err));
  });
};
//function to post update book Page
exports.postUpdateBookModel = (
  id,
  title,
  price,
  description,
  author,
  filename,
  userId
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return booksModel.updateOne(
          { _id: id },
          {
            title: title,
            price: price,
            discreption: description,
            author: author,
            image: filename,
            userId: userId,
          }
        );
      })
      .then((book) => {
        resolve("the book was updated successfully!");
      })
      .catch((err) => reject(err));
  });
};
