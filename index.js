import express from "express";
import ejs from 'ejs';
import layouts from 'express-ejs-layouts';
import path from 'path';
import ProductController from "./src/controllers/product.controller.js";
import validateProduct from "./src/middlewares/validation.middleware.js";


const server = express();

// parse form data
server.use(express.urlencoded({extended: true}));

server.use(layouts);

// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Create an instance of ProductController
const productController = new ProductController()
server.get('/', productController.getProducts)
server.get("/new", productController.getAddForm);
server.post("/",validateProduct, productController.addNewProduct);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/update-product", productController.postUpdateProduct );


server.use(express.static('src/views'))

server.listen(3400 , ()=> {
    console.log('Server in running on port 3400');
});