const db = require('../config/db');


class UserModel{
    static async getUsers(){
        return new Promise(resolve =>{
            db.query("SELECT * FROM users", [], (error,result) =>{
                if(!error){
                    resolve(result);
                }
            });
        });
    }

    static async addUser(userName,password,avatar){
        return new Promise(resolve => {
            db.query(
                "INSERT INTO users (userName,password,avatar) VALUES (?,?,?)", [
                    userName,
                    password,
                    avatar
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
}

module.exports = UserModel;