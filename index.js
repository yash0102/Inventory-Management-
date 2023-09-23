import express from "express";
import ejs from 'ejs';
import layouts from 'express-ejs-layouts';
import path from 'path';
import ProductController from "./src/controllers/product.controller.js";
import validateProduct from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import validateRegister from "./src/middlewares/register.validation.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = express();

server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);
server.use(session({
    secret: 'SecretKey',
    resave: false,            // regenerate session id
    saveUninitialized: true,  // save even session is empty
    cookie: { secure: false}, // using http,its not secure so false
}))

// parse form data
server.use(express.urlencoded({extended: true}));

server.use(layouts);

// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Create an instance of ProductController
const productController = new ProductController()
const usersController = new UserController();

server.get('/', auth, productController.getProducts)
server.get("/new",auth, productController.getAddForm);
server.post("/", auth, uploadFile.single('imageUrl'), validateProduct, productController.addNewProduct);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/update-product", auth, productController.postUpdateProduct);
server.post("/delete-product/:id", auth, productController.deleteProduct);
server.get("/register",usersController.getRegister);
server.post("/register",validateRegister,usersController.postRegister);
server.get("/login",usersController.getLogin);
server.post("/login",usersController.postLogin);
server.get("/logout",usersController.logout);

server.listen(3400 , ()=> {
    console.log('Server in running on port 3400');
});