var express = require('express');
var router = express.Router();

const {validationRules, ProductsController} = require("../controllers/ProductsController");

//const productsController = require("../controllers/ProductsController");


router.get('/allproducts', ProductsController.getProducts);

router.get('/productinfo/:productID', ProductsController.getProduct);

router.get('/addproduct', (req,res)=>{
    res.render('addproduct');
});

///add product
router.post("/addproduct",validationRules ,ProductsController.addProduct);

///update product

router.get('/addproduct/:productID', ProductsController.getProduct2);
router.post("/addproduct/:productID" ,ProductsController.updateProduct);

///delete product
router.post('/deleteproduct/:productID', ProductsController.deleteProduct);


module.exports = router;