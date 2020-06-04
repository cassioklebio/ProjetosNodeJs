const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("categories");

//Method for categories save
exports.postCategory = (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    slug: req.body.slug,
  };

  new Category(newCategory)
    .save()
    .then(() => {
      res.statusCode = 201;
      res.send({ message: "Category successfully created" });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
      res.statusCode = 417;
      res.send({ message: "Internal error" });
    });
};

//Method listing all categories
exports.getCategory = (req, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.statusCode = 417;
      res.send({ message: "Internal error" });
    });
};

// Method listing of categories by id
exports.getCategoryId = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .lean()
    .then((categories) => {
      if (categories) {
        res.json(categories);
      } else {
        res.statusCode = 404;
        res.send({ message: "Category not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.statusCode = 417;
        res.send({ message: "Internal error" });
      }
    });
};

// Method for delete category
exports.deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .lean()
    .then((categories) => {
      if (categories) {
        res.statusCode = 200;
        res.send({ message: "Category successfully deleted" });
      } else {
        res.statusCode = 404;
        res.send({ message: "Category not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.statusCode = 417;
        res.send({ message: "Internal error" });
      }
    });
};

// Method for update category
exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      slug: req.body.slug,
    },
  })
    .then(() => {
      res.statusCode = 201;
      res.send({ message: "Category updated successfully" });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send({ message: "Failed to update category: " + err });
    });
};
