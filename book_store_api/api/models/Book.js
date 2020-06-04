const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categorias",
    require: true,
  },
  isbn: {
    type: Number,
    require: true,
  },

  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      require: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("books", Book);
