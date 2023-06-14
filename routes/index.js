var express = require('express');
var router = express.Router();

//const usersController = require("../controllers/UsersController");

const {validationRules, UsersController} = require("../controllers/UsersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/allusers', UsersController.getAllUsers);
router.get('/adduser', (req,res)=>{
  res.render('adduser');
});

router.post("/adduser",validationRules ,UsersController.addUser);
module.exports = router;
