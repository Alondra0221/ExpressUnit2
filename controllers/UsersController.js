const {check, validationResult} = require ("express-validator");
const userModel = require("../models/user");
const UserORM = require("../models/userORM");

const validationRules = [
    check('userName').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('You need at least 8 characters'),
    check('avatar').notEmpty().withMessage('Avatar is empty').isURL().withMessage("Is not a url")
];

class UsersController{

    static async getAllUsers(req,res){
        //let results = await userModel.getUsers();
        let results = await UserORM.findAll();

        if (results){
            //res.send(results);
            res.render("users",{users:results} );
        }
    }

    static async getUser(req,res){
        let id = req.params.id;
        //let results = await userModel.getUser(id);
        let results = await UserORM.findByPk(id);

        if (results){
            //res.send(results);
            res.render("adduser",{user:results} );
        }
    }

    static async addUser(req,res){
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.send(errors.errors[0].msg);
        }
        else{
            //let result  = await userModel.addUser(req.body.userName, req.body.password, req.body.avatar);
            let result = UserORM.create({
                userName : req.body.userName,
                password : req.body.password,
                avatar : req.body.avatar
            });
            if(result){
                //res.send("A new user has been created");
                res.redirect("/users")
            }
            else{
                res.send("Add user failed");
            }

        }
        
    }

    static async updateUser(req,res){
        let id = req.params.id; //ROUTE/addUser/:id
        //let result = await userModel.updateUser(id,req.body.userName, req.body.password, req.body.avatar);
        let result = await UserORM.update({
            userName : req.body.userName,
            password : req.body.password,
            avatar : req.body.avatar,},
            {
                where: {id:id}

        });
        if(result){
            //res.send("The user has been updated");
            res.redirect("/allusers")
        }
        else{
            res.send("Updated failed");
        }
        
    }

    static async deleteUser(req,res){
        let id = req.params.id;
        let result = false;

        if(id){
            //result = await userModel.deleteUser(id);
            result = await UserORM.destroy({where:{id:id}});
        }

        res.status(200).send("Ok");
    }
}

module.exports = {
    validationRules,
    UsersController
};