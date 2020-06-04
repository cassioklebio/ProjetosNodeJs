const express = require("express");
const routerCategory = express.Router();
const CategoryController = require("../controllers/categoryController");

//Catetegory EndPoints
//Category List all
routerCategory.get("/category", CategoryController.getCategory);

//Consult category by id
routerCategory.get("/category/:id", CategoryController.getCategoryId);

//Save category
routerCategory.post("/category", CategoryController.postCategory);

//delete category
routerCategory.delete("/category/:id", CategoryController.deleteCategory);

//Update category
routerCategory.put("/category/:id", CategoryController.updateCategory);

module.exports = routerCategory;
