import express from "express";
import ProductController from "./src/controllers/product.controller.js";

const server = express();

// Create an instance of ProductController
const productController = new ProductController()
server.get('/', productController.getProducts)


server.use(express.static('src/views'))

server.listen(3400 , ()=> {
    console.log('Server in running on port 3400');
});