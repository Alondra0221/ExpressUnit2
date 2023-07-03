const {check, validationResult} = require ("express-validator");
const productModel = require("../models/product");

const validationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('price').notEmpty().withMessage('Price is required'),
    check('description').notEmpty().withMessage('Description is empty'),
    check('image').notEmpty().withMessage('Image is empty')
];


class ProductsController{
    static async getProducts(req,res){
        let results = await productModel.getProducts();

        if (results){
            res.render('products',{products:results} );
        }
    }

    static async getProduct(req,res){
        let id = req.params.productID;
        let results = await productModel.getProduct(id);

        if (results){
            //res.send(results);
            res.render("productInfo",{product:results} );
        }
    }

    static async getProduct2(req,res){
        let id = req.params.productID;
        let results = await productModel.getProduct(id);

        if (results){
            //res.send(results);
            res.render("addproduct",{product:results[0]} );
        }
    }

    static async addProduct(req,res){
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.send(errors.errors[0].msg);
        }
        else{
            let result  = await productModel.addProduct(req.body.title, req.body.price, req.body.description,req.body.image);
            if(result){
                res.redirect("/products/allproducts");
            }
            else{
                res.send("Add product failed");
            }

        }
        
    }

    static async updateProduct(req,res){
        let id = req.params.productID; //ROUTE/addUser/:id
        let result = await productModel.updateProduct(id,req.body.title, req.body.price, req.body.description,req.body.image);
        if(result){
            //res.send("The user has been updated");
            res.redirect("/products/allproducts");
        }
        else{
            res.send("Updated failed");
        }
        
    }

    static async deleteProduct(req,res){
        let id = req.params.productID;
        let result = false;

        if(id){
            result = await productModel.deleteProduct(id);
            res.redirect("/products/allproducts");
        }

        
    }

}


module.exports = {
    validationRules,
    ProductsController
};