const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

const {conn1,conn2} = require("./app/config/db.config");

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const jwtCheck = (req, res) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
        message: "Please provide the token",
        });
    }
}

app.get("/user",(req,res) => {

    jwtCheck(req, res);

    conn1.query("SELECT * FROM user",(error,result) => {
        res.json({body: result });
    })
})

app.post("/login",(req, res) => {
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}' `;
    conn1.query(sql,
    (error,result) => {
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

app.post("/register",(req, res) => {
    conn1.query('INSERT INTO user ( email, password, nama ) VALUES (?)',
    [req.body],
    (error,result) => {
        res.send({
            msg: 'Registered in!',
        });
    })
})

app.get("/buku",(req,res) => {
    jwtCheck(req, res);
    conn2.query("SELECT * FROM buku",(error,result) => {
        res.json({body: result });
    })
})


app.post("/buku",(req,res) => {
    //jwtCheck(req, res);
    console.log(req.body);
    conn2.query('INSERT INTO buku (judul,penulis) VALUES (?)',
    [req.body],
    (error,result) => {
        // res.json({body: result });
        res.send({
            msg: 'Registered in!',
        });
    })
})






// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});