const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Client = new Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  formation: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("client", Client);
