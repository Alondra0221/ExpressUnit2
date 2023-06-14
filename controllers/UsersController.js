const {check, validationResult} = require ("express-validator");
const userModel = require("../models/user");

const validationRules = [
    check('userName').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('You need at least 8 characters'),
    check('avatar').notEmpty().withMessage('Avatar is empty').isURL().withMessage("Is not a url")
];

class UsersController{

    static async getAllUsers(req,res){
        let results = await userModel.getUsers();

        if (results){
            //res.send(results);
            res.render("users",{users:results} );
        }
    }

    static async addUser(req,res){
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.send(errors.errors[0].msg);
        }
        else{
            let result  = await userModel.addUser(req.body.userName, req.body.password, req.body.avatar);
            if(result){
                res.send("A new user has been created");
                //res.redirect("/users")
            }
            else{
                res.send("Add user failed");
            }

        }
        
    }
}

module.exports = {
    validationRules,
    UsersController
};