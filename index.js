import express from "express";
import ejs from 'ejs';
import layouts from 'express-ejs-layouts';
import path from 'path';
import ProductController from "./src/controllers/product.controller.js";
import validateProduct from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";


const server = express();

server.use(express.static("public"));

// parse form data
server.use(express.urlencoded({extended: true}));

server.use(layouts);

// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Create an instance of ProductController
const productController = new ProductController()
const usersController = new UserController();

server.get('/', productController.getProducts)
server.get("/new", productController.getAddForm);
server.post("/", uploadFile.single('imageUrl'), validateProduct, productController.addNewProduct);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/update-product", productController.postUpdateProduct );
server.post("/delete-product/:id", productController.deleteProduct);
server.get("/register",usersController.getRegister);

server.listen(3400 , ()=> {
    console.log('Server in running on port 3400');
});