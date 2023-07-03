const db = require('../config/db');

class ProductModel{

    static async getProducts(){
        return new Promise(resolve =>{
            db.query("SELECT * FROM products", [], (error,result) =>{
                if(!error){
                    resolve(result);
                }
            });
        });
    }

    static async getProduct(productID){
        return new Promise(resolve =>{
            db.query("SELECT * FROM products WHERE productID=?", [productID], (error,result) =>{
                if(!error){
                    resolve(result);
                }
            });
        });
    }


    static async addProduct(title,price,description,image){
        return new Promise(resolve => {
            db.query(
                "INSERT INTO products (title,price,description,image) VALUES (?,?,?,?)", [
                    title,
                    price,
                    description,
                    image
                ],
                (error,result) => {
                    if(!error){
                        resolve(true);
                    }
                    else {
                        console.log(error);
                        resolve(false);
                        
                    }
                }
            );
        });

    }

    static async updateProduct(productID,title,price,description,image){
        return new Promise(resolve => {
            
            db.query(
                "UPDATE products SET title=?, price=?, description=?, image=? WHERE productID=?", [
                    title,
                    price,
                    description,
                    image,
                    productID
                ],
                (error,result) => {
                    if(!error){
                        resolve(true);
                    }
                    else {
                        console.log(error);
                        resolve(false);
                        
                    }
                }
            );
        });

    }

    static async deleteProduct(productID){
        return new Promise(resolve =>{
            db.query(
                "DELETE FROM products WHERE productID=?", 
                [productID],
                (error,result)=>{
                    if(!error){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                }
            )

        });
    }

}

module.exports = ProductModel;