const express = require("express");
const app = express();

// const conn1 = require("./app/config/db.config");

const mysql = require('mysql');

const conn1 = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "docker_jwt_user",
});


//app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/user",(req,res) => {
    conn1.query("SELECT * FROM user",(error,result) => {
        res.json({body: result });
    })
})






// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});