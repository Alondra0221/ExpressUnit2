const mysql = require('mysql2');

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "",
    database: "porto"
}
);

db.getConnection(()=>{
    console.log("Conection to the database succesfully");
});

module.exports = db;