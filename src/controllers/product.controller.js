import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts (req, res) {
        let products = ProductModel.get();

        res.render("products", {
            products: products,
            userEmail: req.session.userEmail,
        });
    }

    getAddForm(req, res) {
        return res.render('new-product', {
            errorMessage: null,
            userEmail: req.session.userEmail,
        });
    }

    addNewProduct(req, res) {
        // console.log(req.body);
        const {name, desc, price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.get();
        res.render("products", { products, userEmail: req.session.userEmail });
    }

    getUpdateProductView(req, res, next){
        // 1. if product exists then return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update-product',{
                product: productFound,
                errorMessage: null,
                userEmail: req.session.userEmail,
            });
        }else {
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render("products", { products });
    }

    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render("products", { products });
    }
}