const mongoose = require("mongoose");
require("../models/Client");
const Client = mongoose.model("client");

//Method for client save
exports.postClient = (req, res) => {
  const newClient = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    formation: req.body.formation,
    phone: req.body.phone,
  };
  new Client(newClient)
    .save()
    .then(() => {
      res.statuscode = 201;
      res.send({ message: "Client successfully created" });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
      res.statuscode = 417;
      res.send({ message: "Internal error" });
    });
};

//Method listing all client
exports.getClient = (req, res) => {
  Client.find()
    .lean()
    .then((client) => {
      res.json(client);
    })
    .catch((err) => {
      res.statusCode = 417;
      res.send({ message: "Internal error" });
    });
};

//Method listing of client by id
exports.getClientId = (req, res) => {
  Client.findOne({ _id: req.params.id })
    .lean()
    .then((client) => {
      if (client) {
        res.json(client);
      } else {
        res.statuscode = 404;
        res.send({ message: "Client not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.statuscode = 417;
        res.send({ message: "Ineternal error" });
      }
    });
};

//Method for delete client
exports.deleteClient = (req, res) => {
  Client.deleteOne({ _id: req.params.id })
    .lean()
    .then((client) => {
      if (client) {
        res.statusCode = 200;
        res.send({ message: "Client successfully deleted" });
      } else {
        res.statusCode = 404;
        res.send({ message: "Client not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.statusCode = 417;
        res.send({ message: "Internal error" });
      }
    });
};

//Method for update client
exports.updateClient = (req, res) => {
  Client.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      formation: req.body.formation,
      phone: req.body.phone,
    },
  })
    .then(() => {
      res.statusCode = 201;
      res.send({ message: "Client updated successfully" });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send({ message: "Failed to update client:  " + err });
    });
};
