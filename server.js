const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

const conn1 = require("./app/config/db.config");

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/user",(req,res) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
        message: "Please provide the token",
        });
    }
    
    conn1.query("SELECT * FROM user",(error,result) => {
        res.json({body: result });
    })
})

app.post("/login",(req, res) => {
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}' `;
    conn1.query(sql,
    (error,result) => {
        console.log(result);
        if(result.length != 0) {
            const token = jwt.sign({
                id:result[0].id,
                email:result[0].email,
            },'the-super-strong-secrect');
            res.send({
                msg: 'Logged in!',
                token,
                user: result[0]
             });
        }else{
            res.status(300).json({message: 'user tidak ditemukan' });
        }
    })
})






// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});