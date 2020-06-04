const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Loan = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    require: true,
  },
  book: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      require: true,
    },
  ],
  returnDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("loan", Loan);
