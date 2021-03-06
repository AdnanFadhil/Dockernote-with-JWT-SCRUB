const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

const {conn1,conn2} = require("./app/config/db.config");

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application docker" });
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

app.get('/create-table-user', function (req, res) {
    conn1.connect(function(err) {
      if (err) throw err;
      const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        password VARCHAR(255),
        nama VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  ENGINE=INNODB;
    `;
      conn1.query(sql, function (err, result) {
        if (err) throw err;
        res.send("user table created");
      });
    });
})

app.get('/create-table-buku', function (req, res) {
    conn2.connect(function(err) {
      if (err) throw err;
      const sql = `
      CREATE TABLE IF NOT EXISTS buku (
        id INT AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(255),
        penulis VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  ENGINE=INNODB;
    `;
      conn2.query(sql, function (err, result) {
        if (err) throw err;
        res.send("buku table created");
      });
    });
})

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
    let sql = `INSERT INTO user ( email, password, nama ) VALUES ('${req.body.email}','${req.body.password}','${req.body.nama}')`;
    conn1.query(sql,
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

app.get("/buku/:id",(req,res) => {
    jwtCheck(req, res);
    conn2.query('DELETE FROM buku WHERE id=?',
    [req.params.id],
    (error,result) => {
        res.json({body: result });
    })
})

app.get("/buku/edit/:id",(req,res) => {
    jwtCheck(req, res);
    conn2.query('UPDATE buku SET judul = ? , penulis = ? WHERE id=?',
    [req.body.judul, req.body.penulis,req.params.id],
    (error,result) => {
        res.json({body: result });
    })
})


app.post("/buku",(req,res) => {
    jwtCheck(req, res);
    let sql1 = `INSERT INTO buku (judul,penulis) VALUES ('${req.body.judul}','${req.body.penulis}')`;
    conn2.query(sql1,
    (error,result) => {
        res.json({body: result });
    })
})






// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});