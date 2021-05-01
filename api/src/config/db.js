var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
});

con.connect(function (err) {
    if (err) throw err;
});




module.exports = con;


