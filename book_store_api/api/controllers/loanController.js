const mongoose = require("mongoose");
require("../models/Loan");
const Loan = mongoose.model("loan");

//Method for loan save
exports.postLoan = (req, res) => {
  const newLoan = {
    client: req.body.client,
    book: req.body.book,
    returnDate: req.body.returnDate,
  };
  new Loan(newLoan)
    .save()
    .then(() => {
      res.statusCode = 201;
      res.send({ message: "Loan successfully created" });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
      res.statuscode = 417;
      res.send({ message: "Internal error" });
    });
};

//Method Listing all Loan
exports.getLoan = (req, res) => {
  Loan.find()
    .lean()
    .then((loan) => {
      res.json(loan);
    })
    .catch((err) => {
      res.statuscode = 417;
      res.send({ message: "Internal error" });
    });
};

//Method listing of loan by id
exports.getLoanId = (req, res) => {
  Loan.findOne({ _id: req.body.id })
    .lean()
    .then((loan) => {
      if (loan) {
        res.json(loan);
      } else {
        res.statuscode = 404;
        res.send({ message: "Loan not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.statuscode = 417;
        res.send({ message: "Internal error" });
      }
    });
};
